import React from 'react'
import { Icon } from 'semantic-ui-react'

const Loading = ({ message }) => (
	<div style={style.loading}>
		<Icon loading name={'spinner'} /> {message}
	</div>
)

const style = {
	loading: {
		marginTop: '10px'
	}
}

export default Loading
