import React from 'react'
import { Card, Dropdown } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { getOptions } from '../../helpers/selectHelper'
import ExamCard from '../UserPage/ExamCard'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import gql from 'graphql-tag'

const querySubjects = gql`
	query subjectQuery($id: ID!) {
		teacher(where: { id: $id }) {
			subjects {
				id
				name
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

const TeacherPage = props => (
	<div>
		<Query query={querySubjects} variables={{ id: 'cjngagee8w3io0b945rfjgc0a' }}>
			{({ data, loading, error }) => {
				if (error) return <ErrorMessage message={error.message} />
				if (loading) return <Loading message={'getting subjects...'} />
				return (
					<div>
						<Dropdown
							placeholder={'Select subject'}
							fluid
							selection
							options={getOptions(data.teacher.subjects)}
							style={{ marginBottom: 10 }}
						/>

						{data.teacher.subjects.map(subject => (
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
						))}
					</div>
				)
			}}
		</Query>
	</div>
)
export default TeacherPage
