import React from 'react'
import { Grid, Form, Button, Container, Segment, Header, Divider } from 'semantic-ui-react'
import { Field } from 'react-final-form'

import CustomRadio from '../CustomComponents/CustomRadio'

const ExamForm = ({ handleSubmit, submitting, pristine, exam }) => (
	<Form onSubmit={handleSubmit}>
		<Grid columns={2} style={style.grid}>
			{exam.questions.map((question, index) => (
				<Grid.Column key={question.id} style={style.column}>
					<Segment secondary stacked>
						<div>Question #{index + 1}</div>
						<div>
							<Header size={'small'}>{question.question}</Header>
							{question.choices.map(choice => (
								<Field key={choice.id} name={`${question.id}`}>
									{({ input, meta }) => (
										<CustomRadio
											input={input}
											meta={meta}
											label={`${choice.key}. ${choice.value}`}
											value={choice.key}
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
	</Form>
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
