import React from 'react'
import { Switch, Route } from 'react-router-dom'
import StudentPage from './components/StudentPage/HomePage'
import teacherPage from './components/TeacherPage/HomePage'
import HomePage from './components/LoginPage/HomePage'
import studentRegisterPage from './components/RegisterPage/StudentRegisterPage'
import teacherRegisterPage from './components/RegisterPage/TeacherRegisterPage'
import studentLoginPage from './components/LoginPage/StudentLoginPage'
import teacherLoginPage from './components/LoginPage/TeacherLoginPage'

const Routes = props => {
	return (
		<Switch>
			<Route path={'/home'} exact component={HomePage} />
			<Route path={'/student'} component={StudentPage} />
			<Route path={'/teacher'} component={teacherPage} />
			<Route path={'/student-login'} exact component={studentLoginPage} />
			<Route path={'/teacher-login'} exact component={teacherLoginPage} />
			<Route path={'/student-register'} exact component={studentRegisterPage} />
			<Route path={'/teacher-register'} exact component={teacherRegisterPage} />
		</Switch>
	)
}

export default Routes
