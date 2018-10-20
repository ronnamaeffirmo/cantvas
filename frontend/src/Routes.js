import React from 'react'
import { Switch, Route } from 'react-router-dom'
import StudentPage from './components/StudentPage/HomePage'
import teacherPage from './components/TeacherPage/HomePage'
import HomePage from './components/LoginPage/HomePage'
import studentRegisterPage from './components/LoginPage/StudentRegisterPage'
import teacherRegisterPage from './components/LoginPage/TeacherRegisterPage'
import studentLoginPage from './components/LoginPage/StudentLoginPage'
import teacherLoginPage from './components/LoginPage/TeacherLoginPage'

const Routes = props => {
	return (
		<Switch>
			<Route path={'/home'} exact component={HomePage} />
			<Route path={'/student'} component={StudentPage} />
			<Route path={'/teacher'} component={teacherPage} />
			<Route path={'/studentLogin'} exact component={studentLoginPage} />
			<Route path={'/teacherLogin'} exact component={teacherLoginPage} />
			<Route path={'/studentRegister'} exact component={studentRegisterPage} />
			<Route path={'/teacherRegister'} exact component={teacherRegisterPage} />
		</Switch>
	)
}

export default Routes
