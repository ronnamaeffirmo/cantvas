import React, { Fragment } from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { Form } from 'react-final-form'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import ExamForm from './ExamForm'
import CustomHeader from '../CustomComponents/CustomHeader'

import { submitExam } from '../../helpers/examHelper'

const queryExam = gql`
	query queryExam($id: ID!) {
		exam(where: { id: $id }) {
			id
			title
			questions {
				id
				question
				choices {
					id
					key
					value
				}
				answer
			}
		}
	}
`

const queryStudent = gql`
	query {
		loggedInStudent {
			id
		}
	}
`

const ExamPage = ({ match, history }) => (
	<div>
		<CustomHeader title={'Exam'} />
		<Query query={queryStudent}>
			{({ loading, error, data }) => {
				if (error) return <ErrorMessage message={error.message} />
				if (loading) return <Loading message={'verifying student....'} />
				const id = data.loggedInStudent.id
				return (
					<Query query={queryExam} variables={{ id: match.params.id }}>
						{({ loading, error, data, client }) => {
							if (error) return <ErrorMessage message={error.message} />
							if (loading) return <Loading message={'loading exam...'} />
							return (
								<Fragment>
									<Segment>
										Exam questions for
										<Header>{data.exam.title}</Header>
									</Segment>
									<Segment style={style.segment}>
										<Form
											onSubmit={async values => {
												await submitExam(data.exam, values, client, history)
											}}
											render={({ handleSubmit, submitting, pristine }) => (
												<ExamForm
													exam={data.exam}
													handleSubmit={handleSubmit}
													submitting={submitting}
													pristine={pristine}
													studentId={id}
												/>
											)}
										/>
									</Segment>
								</Fragment>
							)
						}}
					</Query>
				)
			}}
		</Query>
	</div>
)

const style = {
	segment: {
		maxHeight: '70vh',
		overflow: 'auto'
	}
}

export default ExamPage
