import React from 'react'
import { Menu, Image, Grid, Icon } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Dashboard from './Dashboard'

const GET_ACTIVE_ITEM = gql`
	{
		activeItem @client
	}
`

const getBody = props => {
	if (props.activeItem === 'dashboard') {
		return <Dashboard />
	}
}
const home = props => {
	return (
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
									style={{ color: 'white' }}
									onClick={() =>
										client.writeData({ data: { activeItem: 'dashboard' } })
									}
								>
									<Icon name="dashboard" />
									Dashboard
								</Menu.Item>
								<Menu.Item
									active={data.activeItem === 'account'}
									style={{ color: 'white' }}
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
							width={15}
							style={{ padding: 0, margin: 0, paddingLeft: 20 }}
						>
							{getBody(data)}
						</Grid.Column>
					</Grid>
				)
			}}
		</Query>
	)
}

export default home
