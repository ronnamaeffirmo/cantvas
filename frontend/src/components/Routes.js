import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Menu, Image, Grid, Icon } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Dashboard from './StudentPage/Dashboard'

const GET_ACTIVE_ITEM = gql`
	{
		activeItem @client
	}
`

const getBackgroundColor = (name, activeItem) => {
	if (name === activeItem) {
		return 'white'
	}
	return '#2a474b'
}

const getFontColor = (name, activeItem) => {
	if (name === activeItem) {
		return '#313a96'
	}
	return 'white'
}

const Routes = props => {
	return (
		<Switch>
			<Query query={GET_ACTIVE_ITEM}>
				{({ data, client }) => {
					return (
						<Grid style={{ padding: 0, margin: 0 }}>
							<Grid.Column width={1} style={{ padding: 0, margin: 0 }}>
								<Menu
									pointing
									secondary
									vertical
									icon="labeled"
									style={{
										backgroundColor: '#2a474b',
										height: '100vh',
										width: '100%'
									}}
								>
									<Menu.Item disabled>
										<Image src={require('../images/logo.png')} />
									</Menu.Item>
									<Menu.Item
										active={data.activeItem === 'dashboard'}
										style={{
											borderRight: 0,
											color: getFontColor('dashboard', data.activeItem),
											backgroundColor: getBackgroundColor(
												'dashboard',
												data.activeItem
											)
										}}
										as={Link}
										to={{
											pathname: '/'
										}}
										onClick={() =>
											client.writeData({ data: { activeItem: 'dashboard' } })
										}
									>
										<Icon name="dashboard" />
										Dashboard
									</Menu.Item>
									<Menu.Item
										active={data.activeItem === 'account'}
										style={{
											borderRight: 0,
											color: getFontColor('account', data.activeItem),
											backgroundColor: getBackgroundColor(
												'account',
												data.activeItem
											)
										}}
										as={Link}
										to={{
											pathname: '/account'
										}}
										onClick={() =>
											client.writeData({ data: { activeItem: 'account' } })
										}
									>
										<Icon name="user circle outline" />
										Account
									</Menu.Item>
								</Menu>
							</Grid.Column>
							<Grid.Column
								width={12}
								style={{ padding: 0, margin: 0, paddingLeft: 20 }}
							>
								<Route exact path="/" component={Dashboard} />
							</Grid.Column>
						</Grid>
					)
				}}
			</Query>
		</Switch>
	)
}

export default Routes
