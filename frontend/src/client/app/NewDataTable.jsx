import React from 'react';
import PropTypes from 'prop-types';
import DataTableBody from './DataTableBody.jsx';
import * as Model from './DataTableDataModel.jsx';
import DataAPI from './DataAPI.jsx';
import update from 'immutability-helper';
class NewDataTable extends React.Component {
    constructor(props) {
        super(props);
        this.settings = {
            className:{
                table:["IRC61647DataTable"],
                tableHeaderRow:["IRC61647DataTableHeaderRow"],
                tableHeaderRowColumn:["IRC61647DataTableHeaderRowColumn"],
                tableBodyRow:["IRC61647DataTableRows"],
                tableBodyRowColumn:["IRC61647DataTableRowColumn"]
            }
        };
        this.state = {
            insert10Progress:0,
            dataSourceId:1,
            tableData: {
                header: [[{columnName: "ID", sortable: true, columnDisplayOrder: 0, className:["sort","active-sort","asc"]},
                    {columnName: "Name", sortable: true, columnDisplayOrder: 1,className:["sort","asc"]},
                    {columnName: "Model", sortable: true, columnDisplayOrder: 2,className:["sort","asc"]},
                    {columnName: "Mac Address", sortable: true, columnDisplayOrder: 3,className:["sort","asc"]},
                    {columnName: "Functions", columnDisplayOrder: 4,className:["funcs"]}]],
                body: new Model.DataBody()
            },
            showAddNewData:false
        };
        this.onSortClick = this.onSortClick.bind(this);

        /*LOAD RECORD*/
        this.loadData = this.loadData.bind(this);
        this.onLoadCompleted = this.onLoadCompleted.bind(this);
        this.onLoadFailed = this.onLoadFailed.bind(this);

        /*DELETE RECORD*/
        this.onDeleteButtonClicked = this.onDeleteButtonClicked.bind(this);
        this.onDeleteDataCompleted = this.onDeleteDataCompleted.bind(this);
        this.onDeleteDataFailed = this.onDeleteDataFailed.bind(this);

        /*ADD RECORD*/
        this.onAddNewRecordButtonClicked = this.onAddNewRecordButtonClicked.bind(this);
        this.onAddNewRecordSaveButtonClicked = this.onAddNewRecordSaveButtonClicked.bind(this);
        this.onAddNewRecordCancelButtonClicked = this.onAddNewRecordCancelButtonClicked.bind(this);
        this.onAddNewRecordCompleted = this.onAddNewRecordCompleted.bind(this);
        this.onAddNewRecordFailed = this.onAddNewRecordFailed.bind(this);

        this.onInsert10ButtonClicked = this.onInsert10ButtonClicked.bind(this);
        this.onInsert10RecordsCompleted = this.onInsert10RecordsCompleted.bind(this);
        this.onInsert10RecordsFailed = this.onInsert10RecordsFailed.bind(this);
    }

    componentDidMount(){
        this.loadData();
    }

    onAddNewRecordCancelButtonClicked(){
        this.setState({showAddNewData:false});
    }
    onAddNewRecordSaveButtonClicked(record){
        console.log("THE END COMES NEAR");
        console.log(data);
        this.setState({showAddNewData:false});
        const data = {dataSourceId:1,
            payload:{
                data: {
                    name: record[1].getValue(),
                    model: record[2].getValue(),
                    macAddress: record[3].getValue()
                }
            }};
        const api = new DataAPI();
        api.addData(data,
            this.onAddNewRecordCompleted,
            this.onAddNewRecordFailed);
        //TODO: Add New Record Save Button Clicked
    }
    onAddNewRecordButtonClicked(){
        this.setState({showAddNewData:true});
    }
    onAddNewRecordCompleted(){
        this.loadData();
        console.log("New Record Have been added");
    }
    onAddNewRecordFailed(){

    }

    loadData(){
        const $api = new DataAPI();
        $api.getData(this.state.dataSourceId,this.onLoadCompleted,this.onLoadFailed);
    }

    onDeleteButtonClicked(rowIndex){
        console.log(rowIndex);
        const api = new DataAPI();
        api.deleteData({dataSourceId:this.state.dataSourceId,data:{index:rowIndex}},this.onDeleteDataCompleted,this.onDeleteDataFailed);
    }
    onDeleteDataCompleted(){
        this.loadData();
    }
    onDeleteDataFailed(errMsg){
        debugger;
        this.setState({errorMessage:"Failed to delete record!"});
    }
    onLoadFailed(data){
    }
    onLoadCompleted(data){
        /*
        const testData = [
            [0, "Test", "Nissan", "00:00:00:00:00"],
            [1, "Good", "Honda", "00:00:10:00:20"]
        ];
        */

        const output = data.map((row,rowIndex)=>{
            row = Object.values(row);
            const newRow = row.map((columnValue,colIndex)=>new Model.DataBodyColumn(columnValue,colIndex));
            const lastCol = newRow.length;
            newRow.push(new Model.DataBodyFunctionColumn(rowIndex,false,false,lastCol));
            return newRow;
        });
        const typeSafeRows = output.map((row,index)=> new Model.DataBodyRow(row));
        const newTableData = update(this.state.tableData,{body:{$set:new Model.DataBody(typeSafeRows)}});
        console.log("update new data");

        this.setState({tableData:newTableData},function(){
           // console.log(this.state.tableData);
        });
       // this.setState({errorMessage:"Failed to load initial data, please refresh the page!"});
    }

    onInsert10RecordsCompleted(data){
        const newInsert10Progress = this.state.insert10Progress+1;
        this.setState({insert10Progress:newInsert10Progress});
        if (newInsert10Progress == 10){
            console.log("INSERT 10 COMPLETE");
            debugger;
            this.loadData();
            this.setState({insert10Progress:0});
        }
    }
    onInsert10RecordsFailed(msg){
        console.log("INSERT 10 FAILED");
    }
    onInsert10ButtonClicked(){
        const api = new DataAPI();
        for(var i=0;i<10;i++) {
            const randomMac = "XX:XX:XX:XX:XX:XX".replace(/X/g, function() {
                return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
            });
            const models = ["Nissan","Honda","Mercedes","BMW","Ferrari","HP","Cisco","Microsoft","Apple","Wei"];
            const randomAsciiName = [...Array(5+Math.floor(Math.random()*20))].map((v,i)=>String.fromCharCode(Math.floor(Math.random(0,1)*(127-64)))).join("");
            const data = {dataSourceId:1,
                payload:{
                    data: {
                        name: randomAsciiName,
                        model: models[Math.floor(Math.random() * models.length)],
                        macAddress: randomMac
                    }
                }};
            api.addData(data,
                this.onInsert10RecordsCompleted,
                this.onInsert10RecordsFailed);
        }
    }

    onGetDataComplete(data){
        //this.setState({data:data});
    }
    onGetDataFailed(errorMsg){
       // this.setState({errorMessage:errorMsg});
    }

    render() {
        let header_listOfRows = null;
        header_listOfRows = this.state.tableData.header.map((row, index) =>
            <DataTableHeaderRow key={row+"-"+index} value={row} className={this.settings.className.tableHeaderRow}/>
        );
        return (
            <div>
            <button onClick={this.onInsert10ButtonClicked}>Insert 10 Records</button><br />
                <button onClick={this.onAddNewRecordButtonClicked}>Insert New Record</button>
                <div>Currently shows: 100 Records,Start Index:0. Change the DataAPI.getData method to jump to different page</div>
            <table>
                <thead>
                {header_listOfRows}
                </thead>
                <DataTableBody showAddNewData={this.state.showAddNewData} body={this.state.tableData.body} notifyAddNewData={this.onAddNewRecordSaveButtonClicked} notifyDeletedData={this.onDeleteButtonClicked} />
            </table>
            </div>
        )
    }

    onSortClick(event) {
        alert("Hello World");
    }
}





/*
const DataTableBodyDefaultRow = ({value,className}) => {
    let body_listOfColumns = null;
    let rowIndex = value[3].rowIndex;
    let isEditing = value[3].isEditing;
    let isDeleting = value[3].isDeleting;
    body_listOfColumns = [
        <DataTableBodyTextColumn value={value[0]}/>,
        <DataTableBodyTextColumn value={value[1]}/>,
        <DataTableBodyTextColumn value={value[2]}/>,
        <DataTableBodyFunctionColumn rowIndex={rowIndex} isEditing={isEditing} isDeleting={isDeleting}/>
    ];

    return (
        <tr>{body_listOfColumns}</tr>
    );
}
*/

const DataTableBodyFunctionColumn = ({rowIndex,isEditing,isDeleting}) =>
    <td><button value={rowIndex}>Edit</button><button value={rowIndex}>Delete</button></td>

const DataTableBodyTextColumn = ({value,className}) =>
    <td><span className={className}>{value}</span></td>

const DataTableHeaderRow = ({value,className}) => {
    let header_listOfColumns = null;
    header_listOfColumns = value.map((column, index) => {
        if (column.sortable) {
            return (<DataTableHeaderSortableColumn key={index}
                                                   value={column.columnName} className={column.className} />)
        } else {
            return (
                <DataTableHeaderTextColumn key={index} value={column.columnName} className={column.className}/>)
        }
    });
    return (
        <tr className={className}>
            {header_listOfColumns}

        </tr>);
}
const DataTableHeaderTextColumn = ({value,className}) => <th><span className={className}>{value}</span></th>
const DataTableHeaderSortableColumn = ({value,className,onClick}) => <th><span className={className} onClick={onClick}>A</span>{value}</th>


DataTableHeaderTextColumn.propTypes = {
    value: PropTypes.string.isRequired,
}


class SortableColumn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sortOrder:props.sortOrder
        }
    }
    render(){

        <span className={this.state.sortOrder}>ASC</span>
    }
}
export default NewDataTable;