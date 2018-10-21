import React, { Fragment } from 'react'
import { Form } from 'semantic-ui-react'

const CustomInput = ({ input, meta, ...formInput }) => (
	<Fragment>
		{meta.error && meta.touched && <p style={style.error}>*{meta.error}</p>}
		<Form.Input style={style.input} {...input} {...formInput} fluid iconPosition={'left'} />
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

export default CustomInput
