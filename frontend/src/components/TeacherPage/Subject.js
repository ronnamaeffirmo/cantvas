import React from 'react'
import { Card } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import ExamCard from '../UserPage/ExamCard'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import gql from 'graphql-tag'

const queryExams = gql`
	query examQuery($id: SubjectWhereInput!) {
		exams(where: { Subject: $id }) {
			id
			Subject {
				name
			}
			title
			questions {
				id
			}
		}
	}
`

const getSubject = gql`
	{
		subject @client
	}
`

const Subject = ({ subject }) => {
	return (
		<Query query={queryExams} variables={{ id: { id: subject.id } }} key={subject.id}>
			{({ loading, error, data }) => {
				if (error) return <ErrorMessage message={error.message} />
				if (loading) return <Loading message={'loading exams...'} />
				const exams = data.exams
				return (
					<Card.Group itemsPerRow={4}>
						<Query query={getSubject}>
							{({ data }) => {
								const output = exams.map(exam => (
									<ExamCard
										questions={exam.questions}
										subject={exam.Subject.name}
										title={exam.title}
										key={exam.id}
									/>
								))
								if (data.subject) {
									return output.filter(exam => {
										return exam.props.subject === data.subject
									})
								}
								return output
							}}
						</Query>
					</Card.Group>
				)
			}}
		</Query>
	)
}

export default Subject
