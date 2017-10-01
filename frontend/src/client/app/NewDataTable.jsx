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
            dataSourceId:1,
            tableData: {
                header: [[{columnName: "ID", sortable: true, columnDisplayOrder: 0, className:["sort","active-sort","asc"]},
                    {columnName: "Name", sortable: true, columnDisplayOrder: 1,className:["sort","asc"]},
                    {columnName: "Model", sortable: true, columnDisplayOrder: 2,className:["sort","asc"]},
                    {columnName: "Mac Address", sortable: true, columnDisplayOrder: 3,className:["sort","asc"]},
                    {columnName: "Functions", columnDisplayOrder: 4,className:["funcs"]}]],
                body: new Model.DataBody()
            },
            testData: {
                column: "yes",
            }
        };
        this.onSortClick = this.onSortClick.bind(this);
        this.loadData = this.loadData.bind(this);
        this.onLoadCompleted = this.onLoadCompleted.bind(this);
        this.onLoadFailed = this.onLoadFailed.bind(this);

    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        const $api = new DataAPI();
        $api.getData(this.state.dataSourceId,this.onLoadCompleted,this.onLoadFailed);
    }

    onDeleteDataComplete(){
        this.loadData();
    }
    onDeleteDataFailed(errMsg){
        this.setState({errorMessage:"Failed to delete record!"});
    }
    onLoadFailed(data){
        debugger;
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
        //const newTableData = update(this.state.tableData,{body:{$set:new Model.DataBody(typeSafeRows)}});
        const newTableData = {
            header: [[{columnName: "ID", sortable: true, columnDisplayOrder: 0, className:["sort","active-sort","asc"]},
                {columnName: "Name", sortable: true, columnDisplayOrder: 1,className:["sort","asc"]},
                {columnName: "Model", sortable: true, columnDisplayOrder: 2,className:["sort","asc"]},
                {columnName: "Mac Address", sortable: true, columnDisplayOrder: 3,className:["sort","asc"]},
                {columnName: "Functions", columnDisplayOrder: 4,className:["funcs"]}]],
            body: new Model.DataBody(typeSafeRows)
        };
        console.log("update new data");
        console.log(newTableData);

        this.setState({tableData:newTableData},function(){
           // console.log(this.state.tableData);
        });
        console.log("second time");
       // this.setState({errorMessage:"Failed to load initial data, please refresh the page!"});
    }

    onGetDataComplete(data){
        //this.setState({data:data});
    }
    onGetDataFailed(errorMsg){
       // this.setState({errorMessage:errorMsg});
    }

    render() {
        debugger;
        let header_listOfRows = null;
        header_listOfRows = this.state.tableData.header.map((row, index) =>
            <DataTableHeaderRow key={index} value={row} className={this.settings.className.tableHeaderRow}/>
        );
        return (
            <table>
                <thead>
                {header_listOfRows}
                </thead>
                <DataTableBody body={this.state.tableData.body} />
            </table>
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