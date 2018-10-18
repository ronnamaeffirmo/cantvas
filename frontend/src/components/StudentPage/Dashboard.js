import React from 'react'
import { Menu, Header, Card, Grid, Button, Container } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ExamCard from './ExamCard'

const placeholder = ['', '', '', '', '', '', '']
let int = 0
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
const q = gql`
	{
		exams(where: { Subject: { id: "cjnepy5sbb2bc0b942y2damjy" } }) {
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
		<Query query={querySubjects}>
			{({ loading, error, data }) => {
				if (loading) {
					return 'loading'
				}
				return (
					<div>
						<Menu pointing secondary>
							<Menu.Item disabled>
								<Header size="huge">Dashboard</Header>
							</Menu.Item>
						</Menu>
						<Grid columns="6">
							<Grid.Row>
								{data.student.subjects.map(subject => {
									return (
										<Query query={queryExams} variables={{ id: { id: subject.id } }} key={int++}>
											{({ loading, error, data }) => {
												if (loading) {
													return 'loading'
												}
												console.log(data.exams)
												return data.exams.map(exam => {
													return (
														<Grid.Column key={int++} style={style.column}>
															<ExamCard /> {/* temporary */}
														</Grid.Column>
													)
												})
											}}
										</Query>
									)
								})}
							</Grid.Row>
						</Grid>
					</div>
				)
			}}
		</Query>
	)
}
const style = {
	column: {
		marginBottom: '20px'
	}
}

export default Dashboard
