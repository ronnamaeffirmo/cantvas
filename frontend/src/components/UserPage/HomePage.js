import React from 'react'
import { Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import CreateExam from '../TeacherPage/CreateExam'
import Dashboard from './Dashboard'
import Account from '../StudentPage/Account'
import Sidebar from './Sidebar'
import StudentList from '../TeacherPage/StudentList'
import TeacherAccount from '../TeacherPage/Account'

const getActiveItem = gql`
	{
		activeItemStudent @client
		activeItemTeacher @client
	}
`

const HomePage = ({ menuItems }) => {
	return (
		<Query query={getActiveItem}>
			{({ data, client }) => {
				return (
					<Grid style={style.grid}>
						<Sidebar data={data} client={client} menuItems={menuItems} />

						{/* main body */}
						<Grid.Column width={12} style={style.column}>
							<Route path={'/student/dashboard'} component={Dashboard} />
							<Route path={'/student/account'} component={Account} />
							<Route path={'/teacher/dashboard'} component={Dashboard} />
							<Route path={'/teacher/students'} component={StudentList} />
							<Route path={'/teacher/account'} component={TeacherAccount} />
							<Route path={'/teacher/create-exam'} component={CreateExam} />
						</Grid.Column>
					</Grid>
				)
			}}
		</Query>
	)
}

const style = {
	grid: {
		padding: 0,
		margin: 0
	},
	column: {
		paddingLeft: '30px',
		marginTop: '20px'
	}
}

export default HomePage
