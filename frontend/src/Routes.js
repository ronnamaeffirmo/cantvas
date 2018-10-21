import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import HomePage from './components/UserPage/HomePage'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'

import { studentItems, teacherItems } from './constants/menuItems'

const Routes = props => {
	return (
		<Fragment>
			<Route path={'/login'} component={LoginPage} />
			<Route path={'/student'} component={() => <HomePage menuItems={studentItems} />} />
			<Route path={'/teacher'} component={() => <HomePage menuItems={teacherItems} />} />
			<Route path={'/register'} component={RegisterPage} />
		</Fragment>
	)
}

export default Routes
