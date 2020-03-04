import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../component/Login.jsx';
import Dashboard from '../component/Dashboard.jsx';

export const Routing = (props) => {

		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Login}/>
					<Route path="/home" component={Dashboard}/>
				</Switch>
			</Router>
		);

}