import React from 'react';
import {render} from 'react-dom';
import NewDataTable from './NewDataTable.jsx';
class App extends React.Component{
	render(){
		return(
			<div>
				<NewDataTable/>
			</div>
			) ;
	}
}
render(<App/>, document.getElementById('app'));
