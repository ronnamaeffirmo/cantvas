import React, { Fragment } from 'react'
import { Header, Divider, Segment } from 'semantic-ui-react'
import { Form } from 'react-final-form'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import ExamForm from './ExamForm'

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

const ExamPage = ({ match, history }) => (
	<div>
		<div style={style.pageTitle}>
			<Header size={'huge'} style={style.header}>
				Exam
			</Header>
			<Divider />
		</div>
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
									/>
								)}
							/>
						</Segment>
					</Fragment>
				)
			}}
		</Query>
	</div>
)

const style = {
	pageTitle: {
		marginBottom: '25px'
	},
	header: {
		fontWeight: 'normal'
	},
	segment: {
		maxHeight: '70vh',
		overflow: 'auto'
	}
}

export default ExamPage
