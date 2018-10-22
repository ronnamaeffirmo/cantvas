import React, { Fragment } from 'react'
import { Form } from 'semantic-ui-react'

const CustomSelect = ({ options, title, input, meta }) => (
	<Fragment>
		{meta.error && meta.touched && <div style={style.error}>{meta.error}</div>}
		<Form.Dropdown
			{...input}
			selection
			placeholder={title}
			onChange={(e, { value }) => input.onChange(value)}
			options={options}
		/>
	</Fragment>
)

const style = {
	error: {
		color: 'red',
		textAlign: 'right',
		paddingBottom: 0,
		marginBottom: 0,
		fontSize: '12px'
	}
}

export default CustomSelect
