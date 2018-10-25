import React from 'react'
import { Card } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ExamCard from '../UserPage/ExamCard'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'

const querySubjects = gql`
	query {
		loggedInStudent {
			id
			subjects {
				id
				name
			}
		}
	}
`

const queryExams = gql`
	query examQuery($id: SubjectWhereInput!) {
		exams(where: { subject: $id }) {
			id
			title
			questions {
				id
			}
			published
		}
	}
`

const StudentPage = props => (
	<Query query={querySubjects}>
		{({ loading, error, data }) => {
			if (error) return <ErrorMessage message={error.message} />
			if (loading) return <Loading message={'getting subjects...'} />

			return data.loggedInStudent.subjects.map(subject => (
				<Query query={queryExams} variables={{ id: { id: subject.id } }} key={subject.id}>
					{({ loading, error, data }) => {
						if (error) return <ErrorMessage message={error.message} />
						if (loading) return <Loading message={`loading ${subject.name}...`} />

						return (
							<Card.Group itemsPerRow={4}>
								{data.exams.map(exam => {
									if (exam.published) {
										return (
											<ExamCard
												questions={exam.questions}
												subject={subject.name}
												title={exam.title}
												link={`/student/exam/${exam.id}`}
												text={'Take test'}
												key={exam.id}
											/>
										)
									}
									return null
								})}
							</Card.Group>
						)
					}}
				</Query>
			))
		}}
	</Query>
)

export default StudentPage
