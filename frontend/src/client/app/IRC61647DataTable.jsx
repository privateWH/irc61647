import React from 'react';
import ReactDOM from 'react-dom';
const classNames = {
    editButton: "IRC61647TableEditButton",
    deleteButton: "IRC61647TableDeleteButton",
    saveNewButton: "IRC61647TableSaveNewButton",
    cancelNewButton: "IRC61647TableCancelNewButton",
    dataTable: "IRC61647Table",
    dataTableBodyRow: "IRC61647TableBodyRow",
    dataTableBodyNewRow: "IRC61647TableBodyNewRow",
    dataTableBodyNewRowActive: "IRC61647TableBodyNewRowActive",
    dataTableBodyNewRowDisable: "IRC61647TableBodyNewRowDisable",
    dataTableBodyNewRowHide: "IRC61647TableBodyNewRowHide",
    dataTableBodyNewRowTextColumn: "IRC61647TableBodyNewRowTextColumn"
};
const buttonLabels = {
    editButton: "Edit",
    deleteButton: "Delete"
}


let currentClassNames = {
    dataTableBodyNewRow: [classNames.dataTableBodyNewRow,classNames.dataTableBodyNewRowHide].join(' ')
}


let editButtonClick;
let saveButtonClick;
let deleteButtonClick;
//let ids;
let controller;
let newRowData;

const DataTable = ({that,table,editClick,newRow,saveClick,deleteClick,cancelClick}) => {
    console.log(editClick);
    console.log(that);
    controller = that;
    newRowData = newRow;
    editButtonClick = function(event){
        editClick(event);

        /*
        let row = event.target.parentNode.parentNode;
        row = ReactDOM.render(
            (<td>Good</td>),
            row
        );
        */
    };

    deleteButtonClick = function(event){
        console.log(event.target.parentNode.value);
        const deleteId = event.target.parentNode.parentNode.childNodes[0].innerText;
        debugger;

        deleteClick({index:deleteId});
    }

    saveButtonClick = function(event){
        const allInputs= document.querySelectorAll("."+classNames.dataTableBodyNewRowTextColumn+" input");
        const data = [...allInputs].map((input)=>input.value);

        if (data.length == 4){
            const obj = {
                id:data[0],
                name:data[1],
                model:data[2],
                macAddress:data[3]
            }
            saveClick(obj);
        } else {
            saveClick({error:"Failed to pass length test"});
        }
    }

    return(
        <table className={classNames.dataTable}><DataTableHeader header={table.header}/><DataTableBody body={table.body}/></table>
    );
}


const DataTableHeader = ({header}) => <thead>{header.map((row,index)=> <DataTableHeaderRow key={row+"-"+index} row={row} />)}</thead>
const DataTableHeaderRow = ({row})=> <tr>{row.map((column,index)=><DataTableHeaderColumn key={column+"-"+index} column={column} />)}<DataTableHeaderColumnFuncs /></tr>
const DataTableHeaderColumn = ({column}) => <th>{column}</th>
const DataTableHeaderColumnFuncs = ()=><th>Functions</th>

const DataTableFooterRow = ({row})=> <tr>{row.map((column,index)=><DataTableFooterColumn key={column+"-"+index} column={column} />)}</tr>
const DataTableFooterColumn = ({column}) => <td>{column}</td>
const DataTableBody = ({body}) => <tbody>
<DataTableBodyNewRow row={newRowData}/>
{body.map((row,index)=> <DataTableBodyRow key={row+"-"+index} row={row} />)}
</tbody>

const DataTableBodyNewRow = ({row})=> <tr className={currentClassNames.dataTableBodyNewRow}>
    {row.map((column,index)=>{ return( <DataTableBodyNewRowTextColumn key={"newRowTextColumn" + column+"-"+index} value={column} validationMethod={validationMethod} inputKey={column+"-"+index} />)})}
    <DataTableBodyColumnSaveOrCancel /></tr>
const DataTableBodyNewRowTextColumn = ({value}) => <td className={classNames.dataTableBodyNewRowTextColumn} >
    <UnControllInputTextBox value={value} />
</td>
const UnControllInputTextBox = ({value}) =>
    <input type="text" ref={(input)=>{}}/>

const DataTableBodyColumnSaveOrCancel = () => <td><button className={classNames.saveNewButton} onClick={saveButtonClick}>Save</button><button className={classNames.cancelNewButton}>Cancel</button></td>

const DataTableBodyRow = ({row}) => <tr className={classNames.dataTableBodyRow}>{row.map((column,index)=>{ return( <DataTableBodyColumn key={column+"-"+index} column={column} />)})}<DataTableBodyColumnFuncs/></tr>
const DataTableBodyColumn = ({column}) => <td>{column}</td>
const DataTableBodyColumnFuncs = () => <td>
    {/*<button className={classNames.editButton} value="1" onClick={editButtonClick}>{buttonLabels.editButton}</button>*/}
    <button className={classNames.deleteButton} onClick={deleteButtonClick}>{buttonLabels.deleteButton}</button>
</td>

export default DataTable



/* JUNKS */
let validationMethod = function(input){
    console.log(input.target.value);
    const elems = document.getElementsByClassName(classNames.dataTableBodyNewRowTextColumn);
    controller.setState({newRow:[...elems].map((elem)=>elem.childNodes[0].value)});
    //controller.setState({newRow:elems.map((elem)=>elem.value)});
    //controller.setState({newRow:})
    input.target.focus();
    console.log(input);
}

const DataTableFooter = ({footer}) => <tfoot>{footer.map((row,index)=> <DataTableFooterRow key={row+"-"+index} row={row} />)}</tfoot>
