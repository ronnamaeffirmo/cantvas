import React from 'react'
import { Menu, Header } from 'semantic-ui-react'

const dashboard = props => {
	return (
		<Menu pointing secondary style={{ width: '70%' }}>
			<Menu.Item disabled>
				<Header size="huge">Dashboard</Header>
			</Menu.Item>
		</Menu>
	)
}

export default dashboard
