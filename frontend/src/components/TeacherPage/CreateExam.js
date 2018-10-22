import React from 'react'
import { Header, Divider } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ExamSettings from './ExamSettings'
import QuestionArea from './QuestionArea'

const getStatus = gql`
	{
		dropdownDisable @client
	}
`

const CreateExam = ({ history }) => {
	return (
		<Query query={getStatus}>
			{({ data: { dropdownDisable: disabled }, client }) => (
				<div>
					<div style={style.pageTitle}>
						<Header size={'huge'} style={style.header}>
							Exam Maker
						</Header>
						<Divider />
					</div>

					<ExamSettings disabled={disabled} client={client} />
					<QuestionArea disabled={disabled} client={client} history={history} />
				</div>
			)}
		</Query>
	)
}

const style = {
	pageTitle: {
		marginBottom: '25px'
	},
	header: {
		fontWeight: 'normal'
	}
}

export default CreateExam
