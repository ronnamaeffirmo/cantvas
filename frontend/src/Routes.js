import React from 'react'
import { Switch, Route } from 'react-router-dom'

import StudentPage from './components/StudentPage/HomePage'
import LoginPage from './components/LoginPage/LoginPage'

const Routes = props => {
	return (
		<Switch>
			<Route path="/login" exact component={LoginPage} />
			<Route path="/student" component={StudentPage} />
		</Switch>
	)
}

export default Routes
