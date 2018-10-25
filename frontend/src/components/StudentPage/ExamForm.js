import React from 'react'
import { Grid, Form, Button, Container, Segment, Header, Divider } from 'semantic-ui-react'
import { Field } from 'react-final-form'
import { ApolloConsumer, Query } from 'react-apollo'
import gql from 'graphql-tag'

import CustomRadio from '../CustomComponents/CustomRadio'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'

const answers = gql`
	query answers($data: AnswerWhereInput) {
		answers(where: $data) {
			answer {
				key
				value
			}
		}
	}
`

const ExamForm = ({ handleSubmit, submitting, pristine, exam }) => (
	<ApolloConsumer>
		{client => (
			<Form onSubmit={handleSubmit}>
				<Grid columns={2} style={style.grid}>
					{exam.questions.map((question, index) => (
						<Grid.Column key={question.id} style={style.column}>
							<Segment secondary stacked>
								<div>Question #{index + 1}</div>
								<div>
									<Header size={'small'}>{question.question}</Header>
									<Query
										query={answers}
										variables={{
											data: {
												AND: {
													question: { id: question.id },
													exam: { id: exam.id }
												}
											}
										}}>
										{({ loading, error, data }) => {
											return question.choices.map(choice => {
												const value =
													data.answers && data.answers.length ? data.answers[0].answer.value : ''
												const selected = value === choice.value ? choice.key : ''

												if (error) {
													return <ErrorMessage message={error.message} key={choice.id} />
												}
												if (loading) {
													return <Loading message={'loading choices...'} key={choice.id} />
												}
												return (
													<Field key={choice.id} name={`${question.id}`}>
														{({ input, meta }) => (
															<CustomRadio
																input={input}
																meta={meta}
																previousChoice={selected}
																label={`${choice.key}. ${choice.value}`}
																value={choice.key}
																client={client}
																examId={exam.id}
																questionId={question.id}
																choiceId={choice.id}
															/>
														)}
													</Field>
												)
											})
										}}
									</Query>
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
			</Form>
		)}
	</ApolloConsumer>
)

const style = {
	grid: {
		padding: '8px'
	},
	column: {
		padding: '8px'
	}
}

export default ExamForm
