import React from 'react';
import '../css/test.css';
import axios from 'axios';
class AwesomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likesCount : 0,
            ajaxOut:''
        };

        this.onLike = this.onLike.bind(this);
    }

    componentDidMount(){
        const _this = this;
        var $endpoint = '/data/get/1/list-of-limit';
        this.requests = axios.get($endpoint,{
            transformResponse:function(data){
                return data;
            }
        })
            .then(function (result) {
                console.log(result);
                window.testData = result;
                //_this.setState({ajaxOut:result.data});
            })
    }
    componentWillUnmount(){
        this.requests.abort();
    }

    onLike () {
        let newLikesCount = this.state.likesCount + 1;
        this.setState({likesCount: newLikesCount});
    }

    render() {
        return (
            <div>
                Likes : <span className="tryMe">{this.state.likesCount}</span>
                <div><button onClick={this.onLike}>Like Me</button></div>
                <span>{this.state.ajaxOut}</span>
            </div>
        );
    }

}

export default AwesomeComponent;