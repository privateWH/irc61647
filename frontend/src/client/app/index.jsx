import React from 'react';
import {render} from 'react-dom';
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
