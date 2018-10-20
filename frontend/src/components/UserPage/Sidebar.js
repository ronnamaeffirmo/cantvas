import React from 'react'
import { Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import StudentSidebarItems from '../StudentPage/SidebarItems'
import TeacherSidebarItems from '../TeacherPage/SidebarItems'

const Sidebar = ({ data: { activeItemStudent, activeItemTeacher }, client }) => (
	<Grid.Column width={1} style={style.column}>
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
	</Grid.Column>
)

const style = {
	column: {
		padding: 0,
		margin: 0
	}
}

export default Sidebar
