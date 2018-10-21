import React from 'react'
import { Grid, Form } from 'semantic-ui-react'
import { Field } from 'react-final-form'

const Choice = ({ question, choice, required }) => (
	<Field name={`choice${question}-${choice}`} validate={required}>
		{({ input, meta }) => (
			<Grid.Column>
				<Form.Input {...input} fluid placeholder={`Choice ${choice}`} />
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
)

export default Choice
