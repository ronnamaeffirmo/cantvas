import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import StudentPage from '../StudentPage/StudentPage'
import TeacherPage from '../TeacherPage/TeacherPage'
import CustomHeader from '../CustomComponents/CustomHeader'

const Dashboard = props => {
	return (
		<Fragment>
			<CustomHeader title={'Dashboard'} />
			<Route path={'/teacher/dashboard'} component={TeacherPage} />
			<Route path={'/student/dashboard'} component={StudentPage} />
		</Fragment>
	)
}

const style = {
	pageTitle: {
		marginBottom: '25px'
	},
	header: {
		fontWeight: 'normal'
	}
}

export default Dashboard
