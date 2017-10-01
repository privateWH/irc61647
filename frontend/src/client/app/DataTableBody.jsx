import React from 'react';
import PropTypes from 'prop-types';
import * as Model from './DataTableDataModel.jsx';
import '../css/DataTable.css';
import update from 'immutability-helper';
class DataTableBody extends React.Component{
    constructor(props){
        super(props);
        console.log("Called DataTableBody");
        this.state = {
            body: this.props.body,
            showAddNewData: this.props.showAddNewData
        };

        this.notifyUpdatedData = this.props.notifyUpdatedData;
        this.notifyDeletedData = this.props.notifyDeletedData;
        this.notifyAddNewData = this.props.notifyAddNewData;
        this.notifySorted = this.props.notifySorted;
        this.signalBodyLockForUpdate = this.signalBodyLockForUpdate.bind(this);
        this.signalBodyLockForDelete = this.signalBodyLockForDelete.bind(this);
        this.onEditButtonClicked = this.onEditButtonClicked.bind(this);
        this.onDeleteButtonClicked = this.onDeleteButtonClicked.bind(this);
        this.onSortClick = this.onSortClick(this);
        this.notifiedSaveInput = this.notifiedSaveInput.bind(this);

        this.notifiedSaveAddInput = this.notifiedSaveAddInput.bind(this);
        this.notifiedCancelSaveAddInput = this.notifiedCancelSaveAddInput.bind(this);

    }

    signalBodyLockForUpdate(){
        console.log("The Data Body is Lock Down for Updating Record");
    }

    signalBodyLockForDelete(){
        console.log("The Data Body is Lock Down for Deleting Record");
    }

    onSortClick(){

    }

    onEditButtonClicked(configCol){
        const rowIndex = configCol.getRowIndex();
        const colIndex = 4;
        let newBody =update(this.state.body,{rows:{[rowIndex]:{columns:{[colIndex]:{isEditing:{$set:true}}}}
        }});
        this.setState({body:newBody});
        // Propagate change to parent
        this.notifyUpdatedData();
    }
    onDeleteButtonClicked(configCol){
        const rowIndex = configCol.getRowIndex();
        const deleteRecordKey =this.state.body.getRows()[rowIndex].getColumns()[0].getValue();
        /*
        //AUTOMATIC Refreshed from parent down to this
        let newBody =update(this.state.body,{rows:{$unset:[rowIndex]}});
        this.setState({body:newBody},function(){
        });
        */
        this.notifyDeletedData(deleteRecordKey);
    }

    notifiedSaveInput(row){
        //TODO send update to server.
        console.log(row);
    }
    notifiedSaveAddInput(row){
        this.notifyAddNewData(row);
    }
    notifiedCancelSaveAddInput(){
        this.setState({showAddNewData:false});
        console.log("Cancelled Save Add Input");
    }

    componentWillReceiveProps(nextProps){
        console.log("new props received");
        if (this.props != nextProps){
            this.setState({
                body:nextProps.body,
                showAddNewData:nextProps.showAddNewData
            })
            console.log("refreshed table data state");

        }
    }

    render(){
        let body_listOfRows = null;
        if (this.state.body.getRows() === null || this.state.body.getRows().length === 0){
            body_listOfRows = (<tr key="no-data-found"><td colSpan="5"><span>No Data Exists in the Data Base</span></td></tr>);
        } else{
            body_listOfRows = this.state.body.getRows().map((row, index) => {
                const configCol = row.getColumns()[4];
                if (configCol.getIsEditing()) {
                    return (<DataTableBodyEditRow notifyDeleteClicked={this.onDeleteButtonClicked}
                                                  notifySaveInput={this.notifiedSaveInput} key={row.getColumns()[0].getValue()} value={row}/>)
                } else {
                    return (<DataTableBodyDefaultRow notifyDeleteClicked={this.onDeleteButtonClicked}
                                                     notifyUpdateClicked={this.onEditButtonClicked} key={row.getColumns()[0].getValue()}
                                                     value={row}/>)
                }
            });
        }
        const showAddNewDataClassName = (this.state.showAddNewData)?"add-new-data-show":"add-new-data-hide";

        return(
            <tbody>
            <DataTableBodyAddNewRow showAddNewDataClassName={showAddNewDataClassName} notifySaveInput={this.notifiedSaveAddInput} notifyCancelInput={this.notifiedCancelSaveAddInput} />
            {body_listOfRows}
            </tbody>
        );
    }

}

DataTableBody.defaultProps = {
    notifyUpdatedData: ()=>{},
    notifyDeletedData: ()=>{},
    notifyAddNewData: ()=>{},
    notifySorted:()=>{}
};

DataTableBody.PropTypes = {
    body:PropTypes.object.isRequired,
    notifySorted:PropTypes.func,
    notifyDeletedData:PropTypes.func,
    notifyUpdatedData:PropTypes.func
};

class DataTableBodyAddNewRow extends React.Component{
    constructor(props){
        super(props);
        this.notifySaveInput = this.props.notifySaveInput.bind(this);
        this.notifyCancelInput = this.props.notifyCancelInput.bind(this);
        this.templateColumns = [
            new Model.DataBodyColumn("",0),
            new Model.DataBodyColumn("",1),
            new Model.DataBodyColumn("",2),
            new Model.DataBodyColumn("",3),
            new Model.DataBodyFunctionColumn(-1,true,false,4)
        ];
        this.state = {
            columns:this.templateColumns,
            editingRecord:this.templateColumns,
            showAddNewDataClassName:this.props.showAddNewData
        };
        this.onValueChangeNotify = this.onValueChangeNotify.bind(this);
        this.onEditSaveNotify = this.onEditSaveNotify.bind(this);
        this.onEditSaveCancelNotify = this.onEditSaveCancelNotify.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if (this.props != nextProps){
            this.setState({
                showAddNewDataClassName:nextProps.showAddNewDataClassName,
                editingRecord:this.templateColumns,
                columns:this.templateColumns
            });
        }
    }
    onValueChangeNotify(eventArg){
        console.log("New Data Coming In");
        console.log(eventArg);
        const colIndex = eventArg.getIndex();
        const newValue = eventArg.getValue();
        const editRecord = update(this.state.editingRecord,{[colIndex]:{value:{$set:newValue}}});
        this.setState({editingRecord:editRecord});
    }
    onEditSaveNotify(){
        console.log("Saved with new Data");
        this.notifySaveInput(this.state.editingRecord);
    }
    onEditSaveCancelNotify(){
        console.log("Save Cancel with no new Data");
        // No state in this component needed to change
        this.notifyCancelInput();
    }
    render(){
        return(
            <tr className={this.state.showAddNewDataClassName}>
                <DataTableBodyTextColumn value={this.state.columns[0].getValue()}/>
                <DataTableBodyInputColumn onValueChangeNotify={this.onValueChangeNotify} value={this.state.columns[1]}/>
                <DataTableBodyInputColumn onValueChangeNotify={this.onValueChangeNotify} value={this.state.columns[2]}/>
                <DataTableBodyInputColumnCustom onValueChangeNotify={this.onValueChangeNotify} value={this.state.columns[3]} placeHolder="Mac Address: 00:00:00:00:00"/>
                <DataTableBodyFunctionColumn value={this.state.columns[4]} onEditSaveNotify={this.onEditSaveNotify} onEditCancelNotify={this.onEditSaveCancelNotify}/>
            </tr>
        );
    }
}

DataTableBodyAddNewRow.defaultProps = {
    notifySaveInput:()=>{},
    notifyCancelInput:()=>{}
}

class DataTableBodyDefaultRow extends React.Component{
    constructor(props){
        super(props);
        this.notifyUpdateClicked = this.props.notifyUpdateClicked;
        this.notifyDeleteClicked = this.props.notifyDeleteClicked;
        this.state = {
            columns:this.props.value.getColumns()
        }
        //Proper Binding needed for the proper scope
        this.notifyUpdateClicked = this.notifyUpdateClicked.bind(this);
        this.notifyDeleteClicked = this.notifyDeleteClicked.bind(this);
    }
    componentWillReceiveProps(nextProp){
        if (nextProp != this.props){
            this.setState({
                columns:nextProp.value.getColumns()
            })
        }
    }

    onEditClickNotified (){
        console.log("The Row going to be EDIT is notified");
        const configColumn = this.state.columns[4];
        this.notifyUpdateClicked(configColumn);
    }

    onDeleteClickNotified(){
        console.log("This Row going to be DELETE is notified");
        const configColumn = this.state.columns[4];
        this.notifyDeleteClicked(configColumn);
    }

    render(){
        return(
            <tr>
                <DataTableBodyTextColumn className="column-id" value={this.state.columns[0].getValue()}/>
                <DataTableBodyTextColumn className="column-name" value={this.state.columns[1].getValue()}/>
                <DataTableBodyTextColumn className="column-model" value={this.state.columns[2].getValue()}/>
                <DataTableBodyTextColumn className="column-macAddress" value={this.state.columns[3].getValue()}/>
                <DataTableBodyFunctionColumn onDeleteNotify={this.onDeleteClickNotified.bind(this)} onEditNotify={this.onEditClickNotified.bind(this)} className="column-functions" value={this.state.columns[4]}/>
            </tr>
        );
    }
}
DataTableBodyDefaultRow.defaultProps = {
    notifyUpdateClicked:()=>{},
    notifyDeleteClicked:()=>{}
};

class DataTableBodyEditRow extends React.Component{
    constructor(props) {
        super(props);
        this.notifySaveInput = this.props.notifySaveInput.bind(this);
        this.notifyCancelInput = this.props.notifyCancelInput.bind(this);
        this.state = {
            columns: this.props.value.getColumns(),
            editingRecord: this.props.value.getColumns()
        }
        this.onEditSaveNotify = this.onEditSaveNotify.bind(this);
        this.onValueChangeNotify = this.onValueChangeNotify.bind(this);
    }
    componentWillReceiveProps(nextProp){
        if (nextProp != this.props){
            this.setState({
                columns:nextProp.value.getColumns(),
                editingRecord:nextProp.value.getColumn()
            })
        }
    }
    onValueChangeNotify(eventArg){
        console.log("New Data Coming In");
        console.log(eventArg);
        const colIndex = eventArg.getIndex();
        const newValue = eventArg.getValue();
        const editRecord = update(this.state.editingRecord,{[colIndex]:{value:{$set:newValue}}});
        this.setState({editingRecord:editRecord});
    }
    onEditSaveNotify(){
        console.log("Saved with new Data");
        this.notifySaveInput(this.state.editingRecord);
    }
    render(){
        return(
            <tr>
                <DataTableBodyTextColumn value={this.state.columns[0].getValue()}/>
                <DataTableBodyInputColumn onValueChangeNotify={this.onValueChangeNotify} value={this.state.columns[1]}/>
                <DataTableBodyInputColumn onValueChangeNotify={this.onValueChangeNotify} value={this.state.columns[2]}/>
                <DataTableBodyInputColumnCustom onValueChangeNotify={this.onValueChangeNotify} value={this.state.columns[3]} placeHolder="Mac Address: 00:00:00:00:00"/>
                <DataTableBodyFunctionColumn value={this.state.columns[4]} onEditSaveNotify={this.onEditSaveNotify}/>
            </tr>
        );
    }
}
DataTableBodyEditRow.defaultProps = {
    notifySaveInput: ()=>{},
    notifyCancelInput: ()=>{}
};




class DataTableBodyInputColumn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            textValue: this.props.value.getValue(),
            index: this.props.value.getIndex()
        };
        console.log("Index" + this.state.index);
        this.onValueChangeNotify = this.props.onValueChangeNotify.bind(this);
        this.onInputUpdated = this.onInputUpdated.bind(this);
    }

    onInputUpdated(event){
        const newValue = event.target.value
        this.setState({textValue:newValue});
        const eventArgs = new Model.DataBodyColumn(newValue,this.state.index);
        this.onValueChangeNotify(eventArgs);
    }

    render(){
        return(
            <td><input type="text" value={this.state.textValue} onChange={this.onInputUpdated} /></td>
        )
    }
}
DataTableBodyInputColumn.defaultProps = {
    onValueChangeNotify: ()=>{},
};
DataTableBodyInputColumn.PropTypes = {
}

class DataTableBodyInputColumnCustom extends DataTableBodyInputColumn{
    constructor(props){
        super(props);
        this.onInputUpdated = this.onInputUpdated.bind(this);
        this.onValueChangeNotify = this.onValueChangeNotify.bind(this);
    }
    onInputUpdated(event){
        const newValue = event.target.value;
        if (newValue.match(/^([a-fA-F0-9]{1,2}:?){1,6}$/)){
            console.log("You have pass the input test");
            this.setState({textValue:newValue});
            const eventArgs = new Model.DataBodyColumn(newValue,this.state.index);
            this.onValueChangeNotify(eventArgs);
        }
    }
    render(){
        return(
            <td><input type="text" maxLength="14" onChange={this.onInputUpdated} value={this.state.textValue} placeholder={this.props.placeHolder}/></td>
        );
    }
}
DataTableBodyInputColumnCustom.defaultProps = {
    onValueChangeNotify:()=>{}
}


const DataTableBodyTextColumn = ({value,className}) =>
    <td><span className={className}>{value}</span></td>


class DataTableBodyFunctionColumn extends React.Component{
    constructor(props){
        super(props);
        const config=this.props.value;
        this.state = {
            isEditing:config.getIsEditing(),
            isDeleting:config.getIsDeleting(),
            rowIndex: config.getRowIndex(),
            showSaveButton:config.getIsEditing(),
            showDeleteButton:!config.getIsEditing()
        }

        this.onEditNotify = this.props.onEditNotify.bind(this);
        this.onEditCancelNotify = this.props.onEditCancelNotify.bind(this);
        this.onEditSaveNotify = this.props.onEditSaveNotify.bind(this);
        this.onDeleteNotify = this.props.onDeleteNotify.bind(this);

        this.onEditButtonClick = this.onEditButtonClick.bind(this);
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
        this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    }

    componentWillReceiveProps(nextProp){
        if (nextProp != this.props){
            const config=nextProp.value;
            this.setState({
                isEditing:config.getIsEditing(),
                isDeleting:config.getIsDeleting(),
                rowIndex: config.getRowIndex(),
                showSaveButton:config.getIsEditing(),
                showDeleteButton:!config.getIsEditing()
            });
        }
    }
    onCancelButtonClick(){
        if (this.state.isEditing){
            this.setState({
                isEditing:false,
                showSaveButton:false,
            })
            this.onEditCancelNotify();
        } else{
            alert("The CANCEL function have been altered in MEMORY");
        }

    }

    onSaveButtonClick(){
        if (this.state.isEditing){
            this.setState({
                isEditing:false,
                showSaveButton:false
            });
            this.onEditSaveNotify();
        } else {
            alert("The SAVE function have been altered in MEMORY");
        }
    }
    onEditButtonClick(){
        if (this.state.isEditing){
            // The Edit Button Already Changed to Cancel Text
            this.setState({
                isEditing: false,
                showSaveButton:false,
                showDeleteButton:false
            });
            this.onEditCancelNotify();
        } else {
            this.setState({
                isEditing:true,
                showSaveButton:true,
                showDeleteButton:true
            });
            this.onEditNotify();
        }
    }

    onDeleteButtonClick(){
        if(!this.state.isDeleting){
            this.setState({isDeleting:true,showDeleteButton:false});
            this.onDeleteNotify();
        } else {
            alert("The DELETE function have been altered in memory!");
        }
    }

    render(){
        const editBtnText = (this.state.isEditing)?"Cancel":"Edit";
        const saveBtnText = "Save";
        const deleteBtnText = "Delete";
        let saveButtonClassName = (this.state.showSaveButton)? "save-show":"save-hide";
        let deleteButtonClassName = (this.state.showDeleteButton)? "delete-show":"delete-hide";
        return(
            <td>
                <button className={saveButtonClassName} onClick={this.onSaveButtonClick}>{saveBtnText}</button>
                <button onClick={this.onEditButtonClick}>{editBtnText}</button>
                <button className={deleteButtonClassName} onClick={this.onDeleteButtonClick}>{deleteBtnText}</button>
            </td>
        )
    }
}
DataTableBodyFunctionColumn.defaultProps = {
    onEditNotify:()=>{},
    onEditCancelNotify:()=>{},
    onEditSaveNotify:()=>{},
    onDeleteNotify:()=>{}
};

DataTableBodyFunctionColumn.PropTypes = {
    value: PropTypes.instanceOf(Model.DataTableBodyFunctionColumn).isRequired
}

/*
const DataTableBodyFunctionColumn = ({rowIndex,isEditing,isDeleting}) =>
    <td><button value={rowIndex}>Edit</button><button value={rowIndex}>Delete</button></td>
*/
export default DataTableBody;