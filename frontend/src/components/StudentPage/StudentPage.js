import React from 'react'
import { Card } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ExamCard from '../UserPage/ExamCard'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'

const querySubjects = gql`
	query subjectQuery($id: ID!) {
		student(where: { id: $id }) {
			subjects {
				id
			}
		}
	}
`

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

const GET_USER = gql`
	{
		userStudent @client
	}
`

const StudentPage = props => (
	<Query query={GET_USER}>
		{({ data }) => (
			<Query query={querySubjects} variables={{ id: data.userStudent }}>
				{({ loading, error, data }) => {
					if (error) return <ErrorMessage message={error.message} />
					if (loading) return <Loading message={'getting subjects...'} />
					return data.student.subjects.map(subject => (
						<Query query={queryExams} variables={{ id: { id: subject.id } }} key={subject.id}>
							{({ loading, error, data }) => {
								if (error) return <ErrorMessage message={error.message} />
								if (loading) return <Loading message={'loading exams...'} />
								return (
									<Card.Group itemsPerRow={4}>
										{data.exams.map(exam => (
											<ExamCard
												questions={exam.questions}
												subject={exam.Subject.name}
												title={exam.title}
												key={exam.id}
											/>
										))}
									</Card.Group>
								)
							}}
						</Query>
					))
				}}
			</Query>
		)}
	</Query>
)

export default StudentPage
