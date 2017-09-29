/* https://github.com/taylorhakes/promise-polyfill */
/* https://github.com/github/fetch */
import axios from 'axios';
class DataAPI {
    addData(data, updateState, failedState) {
        var $dataSourceId = data.dataSourceId;
        var config = {
            headers: {'AUTH-TOKEN': 'ABCDEFGHIJKLMNOPQR'}
        }
        var $endpoint = '/data/' + $dataSourceId + '/add'
        axios.post($endpoint, data.data, config).then(function (response) {
            console.log(response);
            updateState(response);

        }).catch(function (error) {
            if (error.response !== null){
                if (error.response.data !== null){
                    failedState(error.response.data.message);
                }
            } else{
                failedState("Sorry new error shows up, please check browser debugging tool for info.");
                console.log(error);
            }
        });
    }

    deleteData(data, updateState,failedState){
        var $dataSourceId = data.dataSourceId;
        var config = {
            headers: {'AUTH-TOKEN': 'ABCDEFGHIJKLMNOPQR'}
        }
        var $endpoint = '/data/' + $dataSourceId + '/delete'

        axios.post($endpoint, data, config).then(function (response) {
            console.log(response);
            updateState(response);

        }).catch(function (error) {
            if (error.response !== null){
                if (error.response.data !== null){
                    failedState(error.response.data.message);
                }
            } else{
                failedState("Sorry new error shows up, please check browser debugging tool for info.");
                console.log(error);
            }
        });
    }

    getData(dataSourceId, updateState, failedState) {
        const _this = this;
        //var $endpoint = '/data/get/1/list-of-limit';
        dataSourceId = 1;
        var startIndex = 0;
        var limitBy = 20;
        var sortOrder = "asc";
        var sortKey = 0;
        var $endpoint = '/data/get/'+dataSourceId+'/start/'+startIndex+'/limit/'+limitBy+'/sort/'+sortOrder+'/by/'+sortKey;

        this.requests = axios.get($endpoint, /*{
            transformResponse:function(data){
                return data;
            }
        }*/)
            .then(function (response) {
                if (!response.data.error){
                    updateState(response.data.data);
                } else {
                    failedState(response.data.error.data);
                }
            })
            .catch(function (error) {
                if (error.response !== null){
                    if (error.response.data !== null){
                        failedState(error.response.data.message);
                    }
                } else{
                    failedState("Sorry new error shows up, please check browser debugging tool for info.");
                    console.log(error);
                }
            });
    }
}
export default DataAPI;