import React, { Fragment } from 'react'
import { Form } from 'semantic-ui-react'
import { getOptions } from '../../helpers/selectHelper'

const CustomSelect = ({ array, title, input, meta }) => {
	const options = getOptions(array)
	return (
		<Fragment>
			<Form.Dropdown
				onChange={(e, { value }) => input.onChange(value)}
				placeholder={title}
				selection
				fluid
				options={options}
			/>
			{meta.error &&
				meta.touched && <p style={{ color: 'red', textAlign: 'right' }}>*{meta.error}</p>}
		</Fragment>
	)
}

export default CustomSelect
