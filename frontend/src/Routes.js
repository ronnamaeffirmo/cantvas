import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import StudentPage from './components/StudentPage/HomePage'
import LoginPage from './components/LoginPage/LoginPage'
import StudentRegisterPage from './components/RegisterPage/StudentRegisterPage'
import TeacherRegisterPage from './components/RegisterPage/TeacherRegisterPage'

const Routes = props => {
	return (
		<Fragment>
			<Route path={'/login'} component={LoginPage} />
			<Route path={'/student'} component={StudentPage} />
			<Route path={'/register-student'} component={StudentRegisterPage} />
			<Route path={'/register-teacher'} component={TeacherRegisterPage} />
		</Fragment>
	)
}

export default Routes
