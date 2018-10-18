import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Menu, Image, Icon } from 'semantic-ui-react'

import '../../styles/sidebar.css'

const Sidebar = ({ data: { activeItem }, client }) => (
	<Grid.Column width={0.5} style={style.column}>
		<Menu pointing secondary vertical icon="labeled" style={style.menu}>
			<Menu.Item disabled style={style.logoContainer}>
				<Image src={require('../../images/logo.png')} style={style.logo} />
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
	column: {
		padding: 0,
		margin: 0
	},
	logoContainer: {
		paddingTop: '25px',
		paddingBottom: '35px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: '60%'
	},
	menu: {
		backgroundColor: '#2a474b',
		height: '100vh',
		width: '100%'
	},
	menuItem: {
		fontWeight: 'lighter',
		borderRight: 0
	}
}

export default Sidebar
