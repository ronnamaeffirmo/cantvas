import React from 'react'
import { Grid, Form } from 'semantic-ui-react'
import { Field } from 'react-final-form'

const Choice = ({ question, choices, required }) => (
	<Field name={`answer${question}`} validate={required}>
		{({ input, meta }) => (
			<Grid.Column>
				<Form.Dropdown
					options={choices.map(choice => ({
						key: `choice${question}-${choice}`,
						value: `choice${question}-${choice}`,
						text: `choice${question}-${choice}`
					}))}
					onChange={(e, { value }) => input.onChange(value)}
					placeholder={`Answer to question ${question}`}
					selection
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
)

export default Choice
