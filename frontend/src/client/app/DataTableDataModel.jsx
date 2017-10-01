

class DataBody {
    constructor(rows = null){
        this.rows = rows;
    }
    getRows(){
        return this.rows;
    }
    setRows(rows){
        this.rows = rows;
    }
}

class DataBodyRow{
    constructor(columns){
        this.columns = columns;
    }
    getColumns(){
        return this.columns;
    }
    setColumns(columns){
        this.columns = columns;
    }
}

class DataBodyColumn{
    constructor(value,index){
        this.value = value;
        this.index = index;
    }
    getValue(){
        return this.value;
    }
    setValue(value){
        this.value = value;
    }
    getIndex(){
        return this.index;
    }
    setIndex(index){
        this.index = index;
    }
}

class DataBodyFunctionColumn{
    constructor(rowIndex, isEditing,isDeleting,index){
        this.rowIndex = rowIndex;
        this.isEditing = isEditing;
        this.isDeleting = isDeleting;
        this.index = index;
    }
    getRowIndex() {
        return this.rowIndex;
    }

    setRowIndex(value) {
        this.rowIndex = value;
    }

    getIsEditing() {
        return this.isEditing;
    }

    setIsEditing(value) {
        this.isEditing = value;
    }

    getIsDeleting() {
        return this.isDeleting;
    }

    setIsDeleting(value) {
        this.isDeleting = value;
    }
    getIndex(){
        return this.index;
    }
    setIndex(index){
        this.index = index;
    }
}

export {
    DataBody,DataBodyFunctionColumn,DataBodyRow,DataBodyColumn

}