import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import StudentPage from './components/StudentPage/HomePage'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterStudentPage from './components/LoginPage/studentRegisterPage'
import RegisterTeacherPage from './components/LoginPage/teacherRegisterPage'

const Routes = props => {
	return (
		<Fragment>
			<Route path={'/login'} component={LoginPage} />
			<Route path={'/student'} component={StudentPage} />
			<Route path={'/register-student'} component={RegisterStudentPage} />
			<Route path={'/register-teacher'} component={RegisterTeacherPage} />
		</Fragment>
	)
}

export default Routes
