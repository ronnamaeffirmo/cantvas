import React, { Fragment } from 'react'
import {
	Header,
	Divider,
	Segment,
	Grid,
	Form as SemanticForm,
	Button,
	Container
} from 'semantic-ui-react'
import { Form, Field } from 'react-final-form'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'

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

const ExamPage = ({ match }) => (
	<div>
		<div style={style.pageTitle}>
			<Header size={'huge'} style={style.header}>
				Exam
			</Header>
			<Divider />
		</div>
		<Query query={queryExam} variables={{ id: match.params.id }}>
			{({ loading, error, data }) => {
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
									console.log('values', values)
								}}
								render={({ handleSubmit, submitting, pristine }) => (
									<SemanticForm onSubmit={handleSubmit}>
										<Grid columns={2} style={style.grid}>
											{data.exam.questions.map((question, index) => (
												<Grid.Column key={question.id} style={style.column}>
													<Segment secondary stacked>
														<div>Question #{index + 1}</div>
														<div>
															<Header size={'small'}>{question.question}</Header>
															{question.choices.map(choice => (
																<Field key={choice.id} name={`question${question.id}`}>
																	{({ input, meta }) => (
																		<SemanticForm.Radio
																			{...input}
																			label={`${choice.key}. ${choice.value}`}
																			value={choice.key}
																			checked={input.value === choice.key}
																			onChange={(e, { value }) => input.onChange(value)}
																		/>
																	)}
																</Field>
															))}
														</div>
													</Segment>
												</Grid.Column>
											))}
										</Grid>
										<Divider />
										<Container textAlign={'center'}>
											<Button type={'submit'} primary disabled={submitting || pristine}>
												Submit exam
											</Button>
										</Container>
									</SemanticForm>
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
	grid: {
		padding: '8px'
	},
	column: {
		padding: '8px'
	},
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
