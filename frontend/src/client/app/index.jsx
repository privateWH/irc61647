import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import ConcreteDataTable from './ConcreteDataTable.jsx';
class App extends React.Component{
	render(){
		return(
			<div>
				<ConcreteDataTable/>
			</div>
			) ;
	}
}
render(<App/>, document.getElementById('app'));
