import React, { Fragment } from 'react'
import { Header, Divider, Card, Icon } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ExamCard from './ExamCard'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'

const querySubjects = gql`
	{
		student(where: { id: "cjnfmsxgutka00b949i3dmrri" }) {
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
	return (
		<Fragment>
			<div style={style.pageTitle}>
				<Header size="huge" style={style.header}>
					Dashboard
				</Header>
				<Divider />
			</div>
			<Query query={querySubjects}>
				{({ loading, error, data }) => {
					if (error) return <ErrorMessage message={error.message} />
					if (loading) return <Loading message="getting subjects..." />

					return data.student.subjects.map(subject => (
						<Query query={queryExams} variables={{ id: { id: subject.id } }} key={subject.id}>
							{({ loading, error, data }) => {
								if (error) return <ErrorMessage message={error.message} />
								if (loading) return <Loading message="loading exams..." />

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

const style = {
	pageTitle: {
		marginBottom: '25px'
	},
	header: {
		fontWeight: 'normal'
	}
}

export default Dashboard
