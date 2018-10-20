import React, { Fragment } from 'react'
import { Form } from 'semantic-ui-react'

const CustomInput = ({ input, meta, ...formInput }) => (
	<Fragment>
		<Form.Input {...input} {...formInput} fluid iconPosition={'left'} />
		{meta.error &&
			meta.touched && <p style={{ color: 'red', textAlign: 'right' }}>*{meta.error}</p>}
	</Fragment>
)

export default CustomInput
