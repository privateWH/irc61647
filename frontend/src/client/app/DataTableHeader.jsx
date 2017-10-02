import React from 'react';
import PropTypes from 'prop-types';

class DataTableHeader extends React.Component{
    constructor(props){
        super(props);
        this.settings ={
            className :{
                tableHeaderRow:["IRC61647DataTableHeaderRow"],
                tableHeaderRowColumn:["IRC61647DataTableHeaderRowColumn"]
            }
        }
        this.state = {
            header: this.props.header
        }
    }
    componentWillReceiveProps(nextProps){
        if (this.props != nextProps){
            this.setState({
                header: this.props.header
            });
        }
    }
    render(){
        let header_listOfRows = null;
        header_listOfRows = this.state.header.map((row, index) =>
            <DataTableHeaderRow key={row+"-"+index} value={row} className={this.settings.className.tableHeaderRow}/>
        );
        return(
            <thead>
            {header_listOfRows}
            </thead>
        )
    }
}
const DataTableHeaderRow = ({value,className}) => {
    let header_listOfColumns = null;
    header_listOfColumns = value.map((column, index) => {
        if (column.sortable) {
            return (<DataTableHeaderSortableColumn key={column+"-"+index}
                                                   value={column.columnName} className={column.className} />)
        } else {
            return (
                <DataTableHeaderTextColumn key={column+"-"+index} value={column.columnName} className={column.className}/>)
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

export default DataTableHeader