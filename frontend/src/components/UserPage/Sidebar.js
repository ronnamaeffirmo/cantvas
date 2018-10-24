import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Menu, Image, Icon } from 'semantic-ui-react'
import { getBackgroundColor, getFontColor } from '../../helpers/colorHelper'

const Sidebar = ({ data: { activeItemStudent, activeItemTeacher }, client, menuItems }) => (
	<Grid.Column width={1} style={style.column}>
		<Menu pointing secondary vertical icon={'labeled'} style={style.menu}>
			<Menu.Item disabled style={style.logoContainer}>
				<Image src={require('../../images/logo.png')} style={style.logo} />
			</Menu.Item>

			{menuItems.map(({ url, key, title, icon }) => (
				<Menu.Item
					key={key}
					as={Link}
					to={url}
					active={activeItemStudent === key}
					style={style.menuItem(key, activeItemStudent)}
					onClick={() => {
						if (key === 'logout') {
							client.writeData({ data: { activeItemStudent: 'dashboard' } })
							localStorage.clear()
						} else {
							client.writeData({ data: { activeItemStudent: key } })
						}
					}}>
					<Icon name={icon} />
					{title}
				</Menu.Item>
			))}
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
	menuItem(name, activeItem) {
		return {
			color: getFontColor(name, activeItem),
			backgroundColor: getBackgroundColor(name, activeItem),
			fontWeight: 'lighter',
			borderRight: 0
		}
	}
}

export default Sidebar
