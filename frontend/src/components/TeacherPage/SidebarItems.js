import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Image, Icon } from 'semantic-ui-react'

import { getBackgroundColor, getFontColor } from '../../helpers/colorHelper'

const Items = ({ activeItemTeacher, client }) => (
	<Menu pointing secondary vertical icon={'labeled'} style={style.menu}>
		<Menu.Item disabled style={style.logoContainer}>
			<Image src={require('../../images/logo.png')} style={style.logo} />
		</Menu.Item>

		{/* navigation routes */}
		<Menu.Item
			as={Link}
			to={'/teacher/dashboard'}
			active={activeItemTeacher === 'dashboard'}
			style={style.menuItem('dashboard', activeItemTeacher)}
			onClick={() => client.writeData({ data: { activeItemTeacher: 'dashboard' } })}>
			<Icon name={'dashboard'} />
			Dashboard
		</Menu.Item>
		<Menu.Item
			as={Link}
			to={'/teacher/students'}
			active={activeItemTeacher === 'students'}
			style={style.menuItem('students', activeItemTeacher)}
			onClick={() => client.writeData({ data: { activeItemTeacher: 'students' } })}>
			<Icon name={'users'} />
			Students
		</Menu.Item>
		<Menu.Item
			as={Link}
			to={'/teacher/account'}
			active={activeItemTeacher === 'account'}
			style={style.menuItem('account', activeItemTeacher)}
			onClick={() => client.writeData({ data: { activeItemTeacher: 'account' } })}>
			<Icon name={'user circle outline'} />
			Account
		</Menu.Item>
		<Menu.Item
			as={Link}
			to={'/teacher/create-exam'}
			active={activeItemTeacher === 'createExam'}
			style={style.menuItem('createExam', activeItemTeacher)}
			onClick={() => client.writeData({ data: { activeItemTeacher: 'createExam' } })}>
			<Icon name={'file'} />
			Exam Maker
		</Menu.Item>
	</Menu>
)

const style = {
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

export default Items
