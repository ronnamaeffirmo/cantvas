import React from 'react'
import { Header, Divider, Grid } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ExamDropDowns from './ExamDropdowns'
import QuestionArea from './QuestionArea'
const getStatus = gql`
	{
		dropdownDisable @client
	}
`

const CreateExam = props => {
	return (
		<Query query={getStatus}>
			{({ data, client }) => {
				const disabled = data.dropdownDisable
				return (
					<div>
						<Header size={'huge'} style={style.header}>
							Create Exam
						</Header>
						<Divider />
						<Grid columns={'equal'}>
							<ExamDropDowns disabled={disabled} client={client} />
							<QuestionArea disabled={disabled} client={client} />
						</Grid>
					</div>
				)
			}}
		</Query>
	)
}

const style = {
	header: {
		fontWeight: 'normal'
	}
}
export default CreateExam
