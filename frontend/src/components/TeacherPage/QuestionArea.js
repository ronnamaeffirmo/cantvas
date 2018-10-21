import React, { Fragment } from 'react'
import { Button, Grid, Segment, Form as SemanticForm } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { required } from '../../helpers/validationHelper'
import { Form, Field } from 'react-final-form'

const getNumbers = gql`
	{
		questionNumber @client
		choiceNumber @client
	}
`

const QuestionArea = ({ disabled, client }) => (
	<Grid.Row>
		<Grid.Column>
			<Query query={getNumbers}>
				{({ data }) => {
					if (data.questionNumber) {
						const questions = Array(data.questionNumber)
							.fill()
							.map((e, num) => num + 1)
						const choices = Array(data.choiceNumber)
							.fill()
							.map((e, num) => num + 1)
						return (
							<div>
								<Button
									fluid
									content={'Confirm'}
									style={disabled ? style.finished : style.inUse}
									onClick={() => client.writeData({ data: { dropdownDisable: true } })}
								/>
								<Form
									onSubmit={async values => {
										console.log(values)
									}}
									render={({ handleSubmit, submitting }) => (
										<SemanticForm onSubmit={handleSubmit}>
											<Segment piled style={disabled ? style.segment : style.finished}>
												{questions.map(question => (
													<div key={question}>
														<Field name={`question${question}`} validate={required}>
															{({ input, meta }) => (
																<Fragment>
																	{`Question no. ${question}`} <br />
																	<SemanticForm.Input
																		{...input}
																		fluid
																		placeholder={`Insert question ${question}`}
																	/>{' '}
																	{meta.error &&
																		meta.touched && (
																			<p style={{ color: 'red', textAlign: 'right' }}>
																				*{meta.error}
																			</p>
																		)}
																	<br />
																</Fragment>
															)}
														</Field>
														<Grid columns={'equal'} style={style.column}>
															<Grid.Row>
																{choices.map(choice => (
																	<Field
																		name={`choice${question}-${choice}`}
																		validate={required}
																		key={choice}>
																		{({ input, meta }) => (
																			<Grid.Column key={choice}>
																				<SemanticForm.Input
																					{...input}
																					fluid
																					placeholder={`Choice ${choice}`}
																				/>
																				{meta.error &&
																					meta.touched && (
																						<p
																							style={{
																								color: 'red',
																								textAlign: 'right'
																							}}>
																							*{meta.error}
																						</p>
																					)}
																			</Grid.Column>
																		)}
																	</Field>
																))}
															</Grid.Row>
														</Grid>
													</div>
												))}
												<Button content={'Submit'} positive />
											</Segment>
										</SemanticForm>
									)}
								/>
							</div>
						)
					}
					return ''
				}}
			</Query>
		</Grid.Column>
	</Grid.Row>
)

const style = {
	segment: {
		height: '70vh',
		width: '100%',
		position: 'absolute',
		overflow: 'auto'
	},
	inUse: {
		display: 'inline'
	},
	finished: {
		display: 'none'
	}
}

export default QuestionArea
