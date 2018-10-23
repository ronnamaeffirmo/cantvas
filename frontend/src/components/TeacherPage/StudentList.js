import React, { Fragment } from 'react'
import { Table, Image } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import CustomHeader from '../CustomComponents/CustomHeader'

import { boyUrl, girlUrl } from '../../constants/assetUrls'
import { getNumeralYearEquivalent } from '../../helpers/studentHelper'

const querySubjects = gql`
	query {
		loggedInTeacher {
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

const StudentList = props => {
	return (
		<Fragment>
			<CustomHeader title={'Students'} />
			<Query query={querySubjects}>
				{({ loading, error, data }) => {
					if (error) return <ErrorMessage message={error.message} />
					if (loading) return <Loading message={'fetching subjects...'} />

					return data.loggedInTeacher.subjects.map(subject => (
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
		</Fragment>
	)
}

export default StudentList
