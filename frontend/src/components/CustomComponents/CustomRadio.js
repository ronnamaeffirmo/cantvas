import React from 'react'
import { Form } from 'semantic-ui-react'

const CustomRadio = ({ input, meta, value, label }) => (
	<Form.Radio
		{...input}
		label={label}
		value={value}
		checked={input.value === value}
		onChange={(e, { value }) => input.onChange(value)}
	/>
)

export default CustomRadio
