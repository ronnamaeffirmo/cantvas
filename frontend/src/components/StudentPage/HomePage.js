import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Dashboard from './Dashboard'
import Account from './Account'
import Sidebar from './Sidebar'

const getActiveItem = gql`
	{
		activeItem @client
	}
`

const HomePage = props => {
	return (
		<Query query={getActiveItem}>
			{({ data, client }) => {
				return (
					<Grid style={style.grid}>
						<Sidebar data={data} client={client} />

						{/* main body */}
						<Grid.Column width={12} style={style.column}>
							<Switch>
								<Route path={'/student/dashboard'} exact component={Dashboard} />
								<Route path={'/student/account'} exact component={Account} />
							</Switch>
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
