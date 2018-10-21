import React from 'react'
import { Header, Divider } from 'semantic-ui-react'

const CreateExam = props => {
	return (
		<div>
			<Header size={'huge'} style={style.header}>
				Create Exam
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
export default CreateExam
