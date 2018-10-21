import React, { Fragment } from 'react'
import { Header, Divider, Table, Image } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'

import { boyUrl, girlUrl } from '../../constants/assetUrls'
import { getNumeralYearEquivalent } from '../../helpers/studentHelper'

const querySubjects = gql`
	query querySubjects($id: ID!) {
		teacher(where: { id: $id }) {
			subjects {
				id
				name
			}
		}
	}
`

const queryStudents = gql`
	query queryStudents($id: ID!) {
		students(where: { subjects_some: { id: $id } }) {
			id
			name
			email
			course
			year
			gender
		}
	}
`

const GET_USER = gql`
	{
		userTeacher @client
	}
`

const StudentList = props => {
	return (
		<Fragment>
			<div style={style.pageTitle}>
				<Header size={'huge'} style={style.header}>
					Students
				</Header>
				<Divider />
			</div>

			<Query query={GET_USER}>
				{({ data: { userTeacher } }) => {
					if (!userTeacher) return <ErrorMessage message={'No such teacher found'} />

					return (
						<Query query={querySubjects} variables={{ id: userTeacher }}>
							{({ loading, error, data: { teacher } }) => {
								if (error) return <ErrorMessage message={error.message} />
								if (loading) return <Loading message={'fetching subjects...'} />

								return teacher.subjects.map(subject => (
									<Query key={subject.id} query={queryStudents} variables={{ id: subject.id }}>
										{({ loading, error, data, client }) => {
											if (error) return <ErrorMessage message={error.message} />
											if (loading) return <Loading message={`getting ${subject.name}...`} />

											return (
												<Table celled striped>
													<Table.Header>
														<Table.Row>
															<Table.HeaderCell colSpan={4}>{subject.name}</Table.HeaderCell>
														</Table.Row>
													</Table.Header>

													<Table.Body>
														{data.students.map(student => (
															<Table.Row key={student.id}>
																<Table.Cell collapsing>
																	<Image
																		rounded
																		src={student.gender === 'MALE' ? boyUrl : girlUrl}
																		size={'mini'}
																	/>
																</Table.Cell>
																<Table.Cell>{student.name}</Table.Cell>
																<Table.Cell>{student.email}</Table.Cell>
																<Table.Cell>
																	{student.course} - {getNumeralYearEquivalent(student.year)}
																</Table.Cell>
															</Table.Row>
														))}
													</Table.Body>
												</Table>
											)
										}}
									</Query>
								))
							}}
						</Query>
					)
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

export default StudentList
