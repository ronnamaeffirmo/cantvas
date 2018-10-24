import React from 'react'
import { Form } from 'semantic-ui-react'

import { handleOnchange } from '../../helpers/answerHelper'

const CustomRadio = props => {
	const { input, value, label, client, examId, questionId, choiceId, previousChoice } = props
	const isDefault = input.value === '' && value === previousChoice

	return (
		<Form.Radio
			{...input}
			label={label}
			value={value}
			checked={isDefault || input.value === value}
			onChange={async (e, { value }) => {
				await handleOnchange(client, examId, questionId, choiceId, value, input)
			}}
		/>
	)
}

export default CustomRadio
