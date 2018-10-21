import { required } from '../../helpers/validationHelper'
import { Form, Field } from 'react-final-form'
import { getArray } from '../../helpers/examFormHelper'
import Question from './Question'
import Choice from './Choice'
import Answer from './Answer'
import { Button, Grid, Segment, Form as SemanticForm } from 'semantic-ui-react'
import React from 'react'
import gql from 'graphql-tag'
import iziToast from 'izitoast'

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
			fluid
			content={'Confirm'}
			style={disabled ? style.finished : style.inUse}
			onClick={() => client.writeData({ data: { dropdownDisable: true } })}
		/>
		<Form
			onSubmit={async values => {
				const subject = values.subject
				const title = values.title
				const output = getArray(questions, choices, values)
				const exam = {
					Subject: { create: { name: subject } },
					title: title,
					questions: { create: output }
				}
				const query = await client.query({
					query: getSubjects,
					variables: { data: { name: subject } }
				})
				exam.Subject =
					query.data.subjects.length > 0
						? { connect: { id: query.data.subjects[0].id } }
						: { create: { name: subject } }
				await client.mutate({
					mutation: createExam,
					variables: { data: exam }
				})
				iziToast.success({ title: 'Exam Creation', message: 'successful' })
				history.push('dashboard')
			}}
			render={({ handleSubmit }) => (
				<SemanticForm onSubmit={handleSubmit}>
					<Segment piled style={disabled ? style.segment : style.finished}>
						<Field name={'subject'} validate={required}>
							{({ input, meta }) => (
								<div>
									<SemanticForm.Input {...input} fluid placeholder={'Subject'} />
									{meta.error &&
										meta.touched && (
											<p style={{ color: 'red', textAlign: 'right' }}>*{meta.error}</p>
										)}
								</div>
							)}
						</Field>
						<br />
						<Field name={'title'} validate={required}>
							{({ input, meta }) => (
								<div>
									<SemanticForm.Input {...input} fluid placeholder={'Title'} />
									{meta.error &&
										meta.touched && (
											<p style={{ color: 'red', textAlign: 'right' }}>*{meta.error}</p>
										)}
								</div>
							)}
						</Field>
						<br />
						{questions.map(question => (
							<div key={question}>
								<Question question={question} required={required} />
								<Answer choices={choices} question={question} required={required} />
								<br />
								<Grid columns={'equal'} style={style.column}>
									<Grid.Row>
										{choices.map(choice => (
											<Choice
												key={choice}
												choice={choice}
												question={question}
												required={required}
											/>
										))}
									</Grid.Row>
								</Grid>
								<br />
							</div>
						))}
						<Button content={'Submit'} positive style={style.button} />
					</Segment>
				</SemanticForm>
			)}
		/>
	</div>
)

const style = {
	segment: {
		height: '70vh',
		width: '100%',
		position: 'absolute',
		overflow: 'auto'
	},
	button: {
		marginTop: 10
	},
	inUse: {
		display: 'inline'
	},
	finished: {
		display: 'none'
	}
}

export default ExamForm
