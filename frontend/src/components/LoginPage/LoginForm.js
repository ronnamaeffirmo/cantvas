import React from 'react'
import { Form, Segment, Button, Header } from 'semantic-ui-react'

const LoginForm = ({ title }) => (
	<Form>
		<Segment piled>
			<Header size={'small'} style={style.header}>
				Login as a <span style={style.title}>{title}</span>
			</Header>
			<Form.Input fluid icon={'user'} iconPosition={'left'} placeholder={'Email address'} />
			<Form.Input
				fluid
				icon={'lock'}
				iconPosition={'left'}
				placeholder={'Password'}
				type={'password'}
			/>
			<Button fluid size={'large'} style={style.button}>
				Login
			</Button>
		</Segment>
	</Form>
)

const style = {
	header: {
		paddingTop: '10px',
		paddingBottom: '10px'
	},
	title: {
		color: 'rgb(209, 66, 45)'
	},
	button: {
		backgroundColor: '#2a474b',
		color: 'white'
	}
}

export default LoginForm
