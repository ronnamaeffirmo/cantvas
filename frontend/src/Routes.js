import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import StudentPage from './components/StudentPage/HomePage'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/LoginPage/RegisterPage'

const Routes = props => {
	return (
		<Fragment>
			<Route path="/login" component={LoginPage} />
			<Route path="/student" component={StudentPage} />
			<Route path="/register" component={RegisterPage} />
		</Fragment>
	)
}

export default Routes
