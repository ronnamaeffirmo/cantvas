import React, { Fragment } from 'react'
import { Header, Divider, Segment } from 'semantic-ui-react'
import { Form } from 'react-final-form'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import iziToast from 'izitoast'

import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import ExamForm from './ExamForm'

const getStudent = gql`
	{
		userStudent @client
	}
`

const queryExam = gql`
	query queryExam($id: ID!) {
		exam(where: { id: $id }) {
			title
			Subject {
				id
				name
			}
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

const scoreExists = gql`
	query scoreExists($examId: ID!) {
		scores(where: { exam: { id: $examId } }) {
			id
		}
	}
`

const updateStudent = gql`
	mutation updateStudent($id: ID!, $score: Int!, $examId: ID!) {
		updateStudent(
			where: { id: $id }
			data: { scores: { create: { score: $score, exam: { connect: { id: $examId } } } } }
		) {
			id
			name
		}
	}
`

const ExamPage = ({ match }) => (
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
									let score = 0
									data.exam.questions.map(({ answer, id }) => {
										if (values[id] === answer) {
											score++
										}
									})

									try {
										const examScore = await client.query({
											query: scoreExists,
											variables: { examId: match.params.id }
										})
										if (examScore.data) throw new Error('Score exists! Already taken the exam...')

										const loggedIn = await client.query({ query: getStudent })
										if (!loggedIn.data) throw new Error('No student is logged in!')

										const student = await client.mutate({
											mutation: updateStudent,
											variables: {
												id: loggedIn.data.userStudent,
												score,
												examId: match.params.id
											}
										})

										if (student.data) {
											iziToast.success({ title: 'Sucessfully submitted exam!' })
										}
									} catch (e) {
										iziToast.error({ title: e.message })
									}
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
