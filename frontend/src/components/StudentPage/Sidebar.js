import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Menu, Image, Icon } from 'semantic-ui-react'

const Sidebar = ({ data: { activeItem }, client }) => (
	<Grid.Column width={1} style={{ padding: 0, margin: 0 }}>
		<Menu pointing secondary vertical icon="labeled" style={style.menu}>
			<Menu.Item disabled>
				<Image src={require('../../images/logo.png')} />
			</Menu.Item>

			{/* navigation routes */}
			<Menu.Item
				as={Link}
				to="/student/dashboard"
				active={activeItem === 'dashboard'}
				style={style.menuItem}
				onClick={() => client.writeData({ data: { activeItem: 'dashboard' } })}>
				<Icon name="dashboard" />
				Dashboard
			</Menu.Item>
			<Menu.Item
				as={Link}
				to="/student/account"
				active={activeItem === 'account'}
				style={style.menuItem}
				onClick={() => client.writeData({ data: { activeItem: 'account' } })}>
				<Icon name="user circle outline" />
				Account
			</Menu.Item>
		</Menu>
	</Grid.Column>
)

const style = {
	menu: {
		backgroundColor: '#2a474b',
		height: '100vh',
		width: '100%'
	},
	menuItem: {
		borderRight: 0
	}
}

export default Sidebar
