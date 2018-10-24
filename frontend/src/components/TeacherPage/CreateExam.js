import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ExamSettings from './ExamSettings'
import QuestionArea from './QuestionArea'
import CustomHeader from '../CustomComponents/CustomHeader'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'

const getStatus = gql`
	{
		dropdownDisable @client
	}
`

const queryTeacher = gql`
	query {
		loggedInTeacher {
			id
			email
			name
			gender
			createdAt
		}
	}
`

const CreateExam = ({ history }) => {
	return (
		<Query query={queryTeacher}>
			{({ loading, error }) => {
				if (error) return <ErrorMessage message={error.message} />
				if (loading) return <Loading message={'verifying teacher....'} />
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
			}}
		</Query>
	)
}

export default CreateExam
