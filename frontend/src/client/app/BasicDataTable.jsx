import React from 'react';

/* Basic DSL for Table */
let DataTable = ({table}) => <table><DataTableHeader header={table.header}/><DataTableFooter footer={table.footer}/><DataTableBody body={table.body}/></table>
let DataTableHeader = ({header}) => <thead>{header.map((row,index)=> <DataTableHeaderRow key={row+"-"+index} row={row} />)}</thead>
let DataTableHeaderRow = ({row})=> <tr>{row.map((column,index)=><DataTableHeaderColumn key={column+"-"+index} column={column} />)}</tr>
let DataTableHeaderColumn = ({column}) => <th>{column}</th>
let DataTableFooter = ({footer}) => <tfoot>{footer.map((row,index)=> <DataTableFooterRow key={row+"-"+index} row={row} />)}</tfoot>
let DataTableFooterRow = ({row})=> <tr>{row.map((column,index)=><DataTableFooterColumn key={column+"-"+index} column={column} />)}</tr>
let DataTableFooterColumn = ({column}) => <td>{column}</td>
let DataTableBody = ({body}) => <tbody>{body.map((row,index)=> <DataTableBodyRow key={row+"-"+index} row={row} />)}</tbody>
let DataTableBodyRow = ({row}) => <tr>{row.map((column,index)=>{ return( <DataTableBodyColumn key={column+"-"+index} column={column} />)})}</tr>
let DataTableBodyColumn = ({column}) => <td>{column}</td>

export {
    DataTable,
    DataTableHeader,
    DataTableHeaderRow,
    DataTableHeaderColumn,
    DataTableFooter,
    DataTableFooterRow,
    DataTableFooterColumn,
    DataTableBody,
    DataTableBodyRow,
    DataTableBodyColumn
}