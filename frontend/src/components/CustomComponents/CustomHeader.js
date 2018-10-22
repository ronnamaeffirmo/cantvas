import React from 'react'
import { Header, Divider } from 'semantic-ui-react'

const CustomHeader = ({ title }) => (
	<div style={style.pageTitle}>
		<Header size={'huge'} style={style.header}>
			{title}
		</Header>
		<Divider />
	</div>
)

const style = {
	pageTitle: {
		marginBottom: '25px'
	},
	header: {
		fontWeight: 'normal'
	}
}

export default CustomHeader
