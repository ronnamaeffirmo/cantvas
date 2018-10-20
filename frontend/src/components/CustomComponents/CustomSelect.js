import React, { Fragment } from 'react'
import { Form } from 'semantic-ui-react'

const CustomSelect = ({ array, title, input, meta }) => {
	return (
		<Fragment>
			<Form.Field {...input} control={'select'}>
				<option value={''} disabled defaultValue hidden>
					{title}
				</option>
				{array.map(option => (
					<option value={option} key={option}>
						{option}
					</option>
				))}
			</Form.Field>
			{meta.error &&
				meta.touched && <p style={{ color: 'red', textAlign: 'right' }}>*{meta.error}</p>}
		</Fragment>
	)
}

export default CustomSelect
