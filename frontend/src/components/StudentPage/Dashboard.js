import React, { Fragment } from 'react'
import { Header, Divider, Card } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ExamCard from './ExamCard'
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
		}
	}
`

const Dashboard = props => {
	const state = props.history.location.state
	if (state) {
		return (
			<Fragment>
				<div style={style.pageTitle}>
					<Header size={'huge'} style={style.header}>
						Dashboard
					</Header>
					<Divider />
				</div>
				<Query query={querySubjects} variables={{ email: state.email }}>
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
			</Fragment>
		)
	}
	return (
		<Fragment>
			<div style={style.pageTitle}>
				<Header size={'huge'} style={style.header}>
					Dashboard
				</Header>
				<Divider />
			</div>
			<ErrorMessage message={'No user found'} />
		</Fragment>
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

export default Dashboard
