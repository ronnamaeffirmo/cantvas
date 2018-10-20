import React from 'react'
import { Card } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ExamCard from '../StudentPage/ExamCard'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'

const querySubjects = gql`
	query subjectQuery($email: String!) {
		student(where: { email: $email }) {
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
			teacher {
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
			<Query query={querySubjects} variables={{ email: data.userStudent }}>
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
												teacher={exam.teacher.name}
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
