import React from 'react'
import { Button, Segment, Form as SemanticForm, Header } from 'semantic-ui-react'
import { Form, Field } from 'react-final-form'
import gql from 'graphql-tag'
import iziToast from 'izitoast'

import CustomInput from '../CustomComponents/CustomInput'
import CustomSelect from '../CustomComponents/CustomSelect'

import { getArray } from '../../helpers/examFormHelper'
import { required } from '../../helpers/validationHelper'

const createExam = gql`
	mutation createExam($data: ExamCreateInput!) {
		createExam(data: $data) {
			id
		}
	}
`

const getSubjects = gql`
	query subjects($data: SubjectWhereInput!) {
		subjects(where: $data) {
			id
		}
	}
`

const ExamForm = ({ disabled, client, questions, choices, history }) => (
	<div>
		<Button
			content={'Confirm'}
			style={disabled ? style.finished : style.inUse}
			onClick={() => client.writeData({ data: { dropdownDisable: true } })}
		/>
		<Form
			onSubmit={async values => {
				// TODO: separate
				try {
					const { subject, title, publish } = values
					const publishStatus = publish === 'yes'
					const output = getArray(questions, choices, values)

					const exam = {
						subject: { create: { name: subject } },
						title,
						questions: { create: output },
						published: publishStatus
					}

					const query = await client.query({
						query: getSubjects,
						variables: { data: { name: subject } }
					})

					exam.subject =
						query.data.subjects.length > 0
							? { connect: { id: query.data.subjects[0].id } }
							: { create: { name: subject } }

					await client.mutate({
						mutation: createExam,
						variables: { data: exam }
					})

					iziToast.success({ title: 'Successfully created exam!' })
					history.push('dashboard')
					window.location.reload()
				} catch (e) {
					iziToast.success({ title: e.message })
				}
			}}
			render={({ handleSubmit }) => (
				<SemanticForm style={style.form} onSubmit={handleSubmit}>
					<Segment piled style={disabled ? style.segment : style.finished}>
						{/* subject and title */}
						<SemanticForm.Group>
							<Field name={'subject'} validate={required}>
								{({ input, meta }) => (
									<CustomInput input={input} meta={meta} placeholder={'Subject'} />
								)}
							</Field>
							<Field name={'title'} validate={required}>
								{({ input, meta }) => (
									<CustomInput input={input} meta={meta} placeholder={'Title'} />
								)}
							</Field>
						</SemanticForm.Group>

						<SemanticForm.Group>
							<Field name={'publish'} validate={required}>
								{({ input, meta }) => (
									<CustomSelect
										input={input}
										meta={meta}
										title={'Publish?'}
										options={[
											{
												key: 'yes',
												value: 'yes',
												text: 'yes'
											},
											{
												key: 'no',
												value: 'no',
												text: 'no'
											}
										]}
									/>
								)}
							</Field>
						</SemanticForm.Group>

						{/* questions */}
						{questions.map(question => (
							<Segment key={question} secondary stacked>
								<Header size={'small'}>Question #{question}</Header>
								<SemanticForm.Group>
									{/* question input */}
									<Field name={`question${question}`} validate={required}>
										{({ input, meta }) => (
											<CustomInput
												width={14}
												input={input}
												meta={meta}
												placeholder={`Insert question ${question}`}
											/>
										)}
									</Field>

									{/* answer */}
									<Field name={`answer${question}`} validate={required}>
										{({ input, meta }) => (
											<CustomSelect
												input={input}
												meta={meta}
												title={`Answer to question ${question}`}
												options={choices.map(choice => ({
													key: `Choice ${choice}`,
													value: `Choice ${choice}`,
													text: `Choice ${choice}`
												}))}
											/>
										)}
									</Field>
								</SemanticForm.Group>

								{/* choices */}
								<SemanticForm.Group widths={'equal'}>
									{choices.map(choice => (
										<Field name={`choice${question}-${choice}`} key={choice} validate={required}>
											{({ input, meta }) => (
												<CustomInput input={input} meta={meta} placeholder={`Choice ${choice}`} />
											)}
										</Field>
									))}
								</SemanticForm.Group>
							</Segment>
						))}
						<div style={style.buttonContainer}>
							<Button content={'Submit'} primary style={style.button} />
						</div>
					</Segment>
				</SemanticForm>
			)}
		/>
	</div>
)

const style = {
	form: {
		marginTop: '20px'
	},
	segment: {
		maxHeight: '70vh',
		overflow: 'auto'
	},
	button: {
		marginTop: 10
	},
	inUse: {
		marginTop: '10px',
		display: 'inline'
	},
	finished: {
		display: 'none'
	},
	buttonContainer: {
		textAlign: 'center'
	}
}

export default ExamForm
