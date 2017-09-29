import React from 'react';
import ReactDOM from 'react-dom';
import * as BasicTable from './BasicDataTable.jsx';
import IRC61647DataTable from './IRC61647DataTable.jsx';
import DataAPI from './DataAPI.jsx';

//import DataTable from './DataTable.jsx';
//import DataTableRow from './DataTableRow.jsx';

/* https://stackoverflow.com/questions/38619182/what-is-the-best-way-to-have-variable-attributes-in-jsx */
const DemoComponent = ({ variablePropName, variablePropValue }) => {
    const variableAttribute = { [variablePropName]: variablePropValue };
    return (
        <input type="text" { ...variableAttribute } />
    );
};


/* Customize the presentation */
//const IRC61647DataTable = DataTable;


class ConcreteDataTable extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showErrorMessage:true,
            errorMessage:"Hello",
            data:{
                header: [['ID', 'Name', 'Model', 'Mac Address']],
                body: [
                    /*['ABC', 'EFG', 'GHI', '12:13:14:15'],
                    ['ZAD', 'EFG', 'GHI', '12:13:14:15'],
                    ['TDD', 'EFG', 'ZEW', '12:13:14:15'],
                    ['ABC', 'EGS', 'GHI', '12:13:14:15'],
                    ['AEF', 'EGS', 'GHI', '12:13:14:15']*/
                ],
                /*footer: [['ID', 'Name', 'Model', 'Mac Address']]*/
            },
            insert10Progress:0,
            dataSourceId:1,
            newRow:
                ['', '', '', '']
            ,
            htmlcode: '&lt;p&gt;&lt;strong&gt;Our Opportunity:&lt;/strong&gt;&lt;/p&gt;'
        }
        ;

        this.data = {
            id:'concrete',
            header: ['Test','Test'],
            footer: ['Good','Good'],
            body: [ [
                    "Yes","No"
                ],
                 [
                    "1","0"
                ]
            ]
        }

        /* LOAD DATA and INIT LOAD */
        this.loadData = this.loadData.bind(this);
        this.onInitLoadComplete = this.onInitLoadComplete.bind(this);
        this.onInitLoadFailed = this.onInitLoadFailed.bind(this);

        /*INSERT DATA EVENTS*/
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
        this.onAddDataComplete = this.onAddDataComplete.bind(this);
        this.onAddDataFailed = this.onAddDataFailed.bind(this);


        /*GET DATA EVENTS*/
        this.onGetDataComplete = this.onGetDataComplete.bind(this);

        /*INSERT 10 RECORDS*/
        this.onInsert10Records = this.onInsert10Records.bind(this);
        this.onInsert10RecordsComplete = this.onInsert10RecordsComplete.bind(this);
        this.onInsert10RecordsFailed = this.onInsert10RecordsFailed.bind(this);


        /*DELETE RECORD*/
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
        this.onDeleteDataComplete = this.onDeleteDataComplete.bind(this);
        this.onDeleteDataFailed = this.onDeleteDataFailed.bind(this);

        this.updateGetDataHandler = this.updateGetDataHandler.bind(this);
        this.onEditButtonClick = this.onEditButtonClick.bind(this);
    }

    onDeleteDataComplete(){
        this.loadData();
    }
    onDeleteDataFailed(errMsg){
        this.setState({errorMessage:"Failed to delete record!"});
    }
    onInitLoadComplete(data){
        debugger;
        this.setState({data: Object.assign({},this.state.data,{
            body:data.map((row)=>Object.values(row))
        })});
    }
    onInitLoadFailed(errorMsg){
        this.setState({errorMessage:"Failed to load initial data, please refresh the page!"});
    }
    componentDidMount(){
        const _this = this;
        this.loadData();
        /*
        const $api = new DataAPI();
        $api.getData(this.state.dataSourceId,this.onInitLoadComplete,this.onInitLoadFailed);
        */

    }
    onDeleteButtonClick(data){
        const api = new DataAPI();
        api.deleteData({dataSourceId:this.state.dataSourceId,data:data},this.onDeleteDataComplete,this.onDeleteDataFailed);
    }

    loadData(){
        const $api = new DataAPI();
        $api.getData(this.state.dataSourceId,this.onInitLoadComplete,this.onInitLoadFailed);
    }

    showErrorMessage(data){
        this.setState({errorMessage:data});
    }
    onGetDataComplete(data){
        this.setState({data:data});
    }
    onGetDataFailed(errorMsg){
        this.setState({errorMessage:errorMsg});
    }
    updateGetDataHandler(data){
        const api = new DataAPI();
        api.getData(1,this.onGetDataComplete,this.onGetDataFailed)
    }

    onAddDataComplete(){
        console.log("ADD COMPLETE");
        this.setState({errorMessage: "ADD DATA Completed"});
        this.loadData();
    }
    onAddDataFailed(){
        console.log("ADD FAILED");
        this.setState({errorMessage: "Add Data Failed"});
    }


    onSaveButtonClick(data){
        const api = new DataAPI();
        console.log("On Save Button CLick");
        console.log(data);
        if (Object.values(data).length != 4){
            this.setState({errorMessage:"Oh no looks like your got less than 4 fields"});
            return;
        }
        api.addData({dataSourceId:this.state.dataSourceId,data:{data:data}},this.onAddDataComplete,this.onAddDataFailed
        );
    }
    onEditButtonClick(event){
        let row=event.target.parentNode.parentNode;

    }
    onInsert10RecordsComplete(data){
        this.setState({insert10Progress:this.state.insert10Progress+1});
        console.log("INSERT 10 COMPLETE");
    }
    onInsert10RecordsFailed(msg){
        console.log("INSERT 10 FAILED");
    }
    onInsert10Records(){
        const api = new DataAPI();
        for(var i=0;i<10;i++) {
            api.addData({dataSourceId:1,
                    data:{
                name:"Test",
                model:"Nissan",
                macAddress:"MM:MM:MM:SS:SS:SS"
            }},
                this.onInsert10RecordsComplete,
                this.onInsert10RecordsFailed);
        }
    }

/*            <BasicTable.DataTable table={this.state.data} /> */

    render(){
        return (
            <div>
                <div>Insert Progress: {this.state.insert10Progress}</div>
                <button onClick={this.onInsert10Records}>Insert 10</button>
                <div style={{display: this.state.showErrorMessage}}>Error Message: {this.state.errorMessage}</div>
                <div dangerouslySetInnerHTML={{ __html: "<h1>Hi there!</h1>" }} />
                <IRC61647DataTable table={this.state.data} deleteClick={this.onDeleteButtonClick} editClick={this.onEditButtonClick} that={this} newRow={this.state.newRow} saveClick={this.onSaveButtonClick}/>
                {/*
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Model</th>
                    <th>Mac Address</th>
                </tr>
                </thead>
                <tfoot></tfoot>
                <tbody>

                <DataTableRow row={this.state.body[1]} />

                <tr>
                    {this.state.body[0].map(
                        (item,index)=>
                            <DataTableColumn key={item+'-'+index} column={item} />
                        )}
                </tr>
                </tbody>
            </table>
            */}
            </div>
        );
       /*return React.createElement(DataTable,{id:this.data.id,header:this.data.header,footer:this.data.footer,body:this.data.body})*/
        /*
        return(
            React.createElement(DataTableRow, {row:this.data.body})
        );
        */
    }
}

export default ConcreteDataTable;