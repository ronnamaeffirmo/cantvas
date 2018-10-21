import React from 'react'
import { Route } from 'react-router-dom'
import { Grid, Menu, Image } from 'semantic-ui-react'

import StudentSidebarItems from '../StudentPage/SidebarItems'
import TeacherSidebarItems from '../TeacherPage/SidebarItems'

const Sidebar = ({ data: { activeItemStudent, activeItemTeacher }, client }) => (
	<Grid.Column width={1} style={style.column}>
		<Menu pointing secondary vertical icon={'labeled'} style={style.menu}>
			<Menu.Item disabled style={style.logoContainer}>
				<Image src={require('../../images/logo.png')} style={style.logo} />
			</Menu.Item>

			{/* items */}
			<Route
				path={'/student'}
				component={() => (
					<StudentSidebarItems activeItemStudent={activeItemStudent} client={client} />
				)}
			/>
			<Route
				path={'/teacher'}
				component={() => (
					<TeacherSidebarItems activeItemTeacher={activeItemTeacher} client={client} />
				)}
			/>
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
	}
}

export default Sidebar
