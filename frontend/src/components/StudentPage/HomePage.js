import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Dashboard from './Dashboard'
import Sidebar from './Sidebar'

const GET_ACTIVE_ITEM = gql`
	{
		activeItem @client
	}
`

const HomePage = props => {
	return (
		<Switch>
			<Query query={GET_ACTIVE_ITEM}>
				{({ data, client }) => {
					return (
						<Grid style={style.grid}>
							<Sidebar data={data} client={client} />

							{/* main body */}
							<Grid.Column width={12} style={style.column}>
								<Route path="/student/dashboard" exact component={Dashboard} />
							</Grid.Column>
						</Grid>
					)
				}}
			</Query>
		</Switch>
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
