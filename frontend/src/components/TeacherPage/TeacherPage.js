import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { getOptions } from '../../helpers/selectHelper'
import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import gql from 'graphql-tag'
import Subject from './Subject'

const querySubjects = gql`
	query {
		loggedInTeacher {
			id
			subjects {
				id
				name
			}
		}
	}
`

const TeacherPage = props => (
	<div>
		<Query query={querySubjects}>
			{({ data, loading, error, client }) => {
				if (error) return <ErrorMessage message={error.message} />
				if (loading) return <Loading message={'getting subjects...'} />

				return (
					<div>
						<Dropdown
							placeholder={'Select subject'}
							fluid
							selection
							options={[
								{ key: 'All subjects', value: null, text: 'All subjects' },
								...getOptions(data.loggedInTeacher.subjects.map(subject => subject.name))
							]}
							style={{ marginBottom: 10 }}
							onChange={(e, { value }) => client.writeData({ data: { subject: value } })}
						/>
						{data.loggedInTeacher.subjects.map(subject => (
							<Subject subject={subject} key={subject.id} />
						))}
					</div>
				)
			}}
		</Query>
	</div>
)
export default TeacherPage
