import React, { Fragment } from 'react'
import { Form } from 'semantic-ui-react'
import { Field } from 'react-final-form'
const Question = ({ question, required }) => (
	<Field name={`question${question}`} validate={required}>
		{({ input, meta }) => (
			<Fragment>
				{`Question no. ${question}`} <br />
				<Form.Input {...input} fluid placeholder={`Insert question ${question}`} />{' '}
				{meta.error &&
					meta.touched && <p style={{ color: 'red', textAlign: 'right' }}>*{meta.error}</p>}
				<br />
			</Fragment>
		)}
	</Field>
)

export default Question
