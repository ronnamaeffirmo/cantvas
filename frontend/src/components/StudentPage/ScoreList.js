import React from 'react'
import { Table } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import CustomHeader from '../CustomComponents/CustomHeader'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'

const queryScores = gql`
	query queryScores($id: ID!) {
		student(where: { id: $id }) {
			scores {
				id
				score
				createdAt
				exam {
					id
					title
					Subject {
						id
						name
					}
				}
			}
		}
	}
`

const getLoggedIn = gql`
	{
		userStudent @client
	}
`

const ScoreList = () => (
	<div>
		<CustomHeader title={'Scores'} />
		<Query query={getLoggedIn}>
			{({ data: { userStudent } }) => {
				if (!userStudent) return <ErrorMessage message={'No such student found'} />

				return (
					<Query query={queryScores} variables={{ id: userStudent }}>
						{({ loading, error, data, data: { student } }) => {
							if (error) return <ErrorMessage message={error.message} />
							if (loading) return <Loading message={'mining for scores...'} />

							return (
								<Table celled striped>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Exam</Table.HeaderCell>
											<Table.HeaderCell>Score</Table.HeaderCell>
											<Table.HeaderCell>Subject</Table.HeaderCell>
											<Table.HeaderCell>Date Took</Table.HeaderCell>
										</Table.Row>
									</Table.Header>

									<Table.Body>
										{student.scores.map(score => (
											<Table.Row key={score.id}>
												<Table.Cell collapsing>{score.exam.title}</Table.Cell>
												<Table.Cell collapsing>{score.score}</Table.Cell>
												<Table.Cell collapsing>{score.exam.Subject.name}</Table.Cell>
												<Table.Cell collapsing>
													{moment(score.createdAt).format('MM/DD/YY')}
												</Table.Cell>
											</Table.Row>
										))}
									</Table.Body>
								</Table>
							)
						}}
					</Query>
				)
			}}
		</Query>
	</div>
)

export default ScoreList
