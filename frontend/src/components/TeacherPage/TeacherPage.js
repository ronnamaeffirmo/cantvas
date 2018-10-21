import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { getOptions } from '../../helpers/selectHelper'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import gql from 'graphql-tag'
import Subject from './Subject'

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

const GET_USER = gql`
	{
		userTeacher @client
	}
`

const TeacherPage = props => (
	<div>
		<Query query={GET_USER}>
			{({ data }) => {
				return (
					<Query query={querySubjects} variables={{ id: data.userTeacher }}>
						{({ data, loading, error, client }) => {
							if (error) return <ErrorMessage message={error.message} />
							if (loading) return <Loading message={'getting subjects...'} />
							return (
								<div>
									<Dropdown
										placeholder={'Select subject'}
										selection
										options={[
											{ key: 'All subjects', value: null, text: 'All subjects' },
											...getOptions(data.teacher.subjects.map(subject => subject.name))
										]}
										style={style.dropdown}
										onChange={(e, { value }) => client.writeData({ data: { subject: value } })}
									/>
									{data.teacher.subjects.map(subject => (
										<Subject subject={subject} key={subject.id} />
									))}
								</div>
							)
						}}
					</Query>
				)
			}}
		</Query>
	</div>
)

const style = {
	dropdown: {
		marginBottom: 20
	}
}

export default TeacherPage
