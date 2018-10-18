import React from 'react'
import { Switch, Route } from 'react-router-dom'
import StudentPage from './StudentPage/HomePage'
import loginPage from './LoginPage/HomePage'

const Routes = props => {
	return (
		<Switch>
			<Route path="/" exact component={loginPage} />
			<Route path="/student" component={StudentPage} />
		</Switch>
	)
}

export default Routes
