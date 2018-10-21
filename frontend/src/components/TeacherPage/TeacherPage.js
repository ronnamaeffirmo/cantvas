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

const TeacherPage = props => (
	<div>
		<Query query={querySubjects} variables={{ id: 'cjngagee8w3io0b945rfjgc0a' }}>
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
								...getOptions(data.teacher.subjects.map(subject => subject.name))
							]}
							style={{ marginBottom: 10 }}
							onChange={(e, { value }) => client.writeData({ data: { subject: value } })}
						/>
						{data.teacher.subjects.map(subject => (
							<Subject subject={subject} key={subject.id} />
						))}
					</div>
				)
			}}
		</Query>
	</div>
)
export default TeacherPage
