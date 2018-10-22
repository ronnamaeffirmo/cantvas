import React, { Fragment } from 'react'
import { Form } from 'semantic-ui-react'

const CustomInput = ({ input, meta, ...formInput }) => (
	<Fragment>
		{meta.error && meta.touched && <div style={style.error}>{meta.error}</div>}
		<Form.Input style={style.input} {...input} {...formInput} />
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
