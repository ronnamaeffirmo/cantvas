import React from 'react'
import { Switch, Route } from 'react-router-dom'
import StudentPage from './components/StudentPage/HomePage'
import LoginPage from './components/LoginPage/LoginPage'
import studentRegisterPage from './components/LoginPage/studentRegisterPage'
import teacherRegisterPage from './components/LoginPage/teacherRegisterPage'

const Routes = props => {
	return (
		<Switch>
			<Route path={'/login'} exact component={LoginPage} />
			<Route path={'/student'} component={StudentPage} />
			<Route path={'/studentRegister'} exact component={studentRegisterPage} />
			<Route path={'/teacherRegister'} exact component={teacherRegisterPage} />
		</Switch>
	)
}

export default Routes
