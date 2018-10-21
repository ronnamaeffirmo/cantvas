import React from 'react'
import { Header, Divider } from 'semantic-ui-react'

const StudentList = props => {
	return (
		<div>
			<Header size={'huge'} style={style.header}>
				Students
			</Header>
			<Divider />
		</div>
	)
}

const style = {
	header: {
		fontWeight: 'normal'
	}
}
export default StudentList
