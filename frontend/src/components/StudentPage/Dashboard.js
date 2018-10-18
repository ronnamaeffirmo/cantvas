import React, { Fragment } from 'react'
import { Header, Divider, Card, Icon } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ExamCard from './ExamCard'

const querySubjects = gql`
	{
		student(where: { id: "cjneq4pypb4vl0b94zy3halsi" }) {
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
				{({ loading, error, data }) => (
					<Card.Group itemsPerRow={4}>
						{loading ? (
							<div style={style.loading}>
								<Icon loading name="spinner" /> getting subjects...
							</div>
						) : (
							data.student.subjects.map(subject => {
								return (
									<Query query={queryExams} variables={{ id: { id: subject.id } }} key={subject.id}>
										{({ loading, error, data }) => {
											return loading ? (
												<div style={style.loading}>
													<Icon loading name="spinner" /> loading exams...
												</div>
											) : (
												data.exams.map(exam => {
													return (
														<ExamCard
															subject={exam.Subject.name}
															teacher={exam.teacher.name}
															title={exam.title}
															key={exam.id}
														/>
													)
												})
											)
										}}
									</Query>
								)
							})
						)}
					</Card.Group>
				)}
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
	},
	loading: {
		marginTop: '10px',
		marginLeft: '10px'
	}
}

export default Dashboard
