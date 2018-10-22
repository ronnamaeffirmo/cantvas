import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ExamSettings from './ExamSettings'
import QuestionArea from './QuestionArea'
import CustomHeader from '../CustomComponents/CustomHeader'

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
					<CustomHeader title={'Create Exam'} />
					<ExamSettings disabled={disabled} client={client} />
					<QuestionArea disabled={disabled} client={client} history={history} />
				</div>
			)}
		</Query>
	)
}

export default CreateExam
