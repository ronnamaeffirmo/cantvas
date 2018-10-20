import React, { Fragment } from 'react'
import { Header, Divider } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import StudentPage from '../StudentPage/StudentPage'

const Dashboard = props => {
	return (
		<Fragment>
			<div style={style.pageTitle}>
				<Header size={'huge'} style={style.header}>
					Dashboard
				</Header>
				<Divider />
			</div>
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
