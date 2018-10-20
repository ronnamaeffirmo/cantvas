import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import HomePage from './components/UserPage/HomePage'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'

const Routes = props => {
	return (
		<Fragment>
			<Route path={'/login'} component={LoginPage} />
			<Route path={'/student'} component={HomePage} />
			<Route path={'/register'} component={RegisterPage} />
		</Fragment>
	)
}

export default Routes
