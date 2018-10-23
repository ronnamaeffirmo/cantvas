import React from 'react'
import { Form as SemanticForm, Segment, Button, Header } from 'semantic-ui-react'
import { Form, Field } from 'react-final-form'
import { ApolloConsumer } from 'react-apollo'
import iziToast from 'izitoast'
import gql from 'graphql-tag'

import CustomInput from '../CustomComponents/CustomInput'
import { required, composeValidators, email } from '../../helpers/validationHelper'
import { storeUser } from '../../helpers/authHelper'

const loginStudent = gql`
	mutation student($email: String!, $password: String!) {
		studentLogin(email: $email, password: $password) {
			token
		}
	}
`

const teacherLogin = gql`
	mutation teacherLogin($email: String!, $password: String!) {
		teacherLogin(email: $email, password: $password) {
			token
		}
	}
`

const LoginForm = ({ title, history }) => (
	<ApolloConsumer>
		{client => (
			<Form
				onSubmit={async values => {
					// TODO: separate
					try {
						const mutation = title === 'student' ? loginStudent : teacherLogin
						const userType = title === 'student' ? 'studentLogin' : 'teacherLogin'

						const result = await client.mutate({ mutation, variables: values })
						const { token } = result.data[userType]

						storeUser(token)
						iziToast.success({ title: 'Login success!' })
						history.push({ pathname: `/${title}/dashboard` })
					} catch (e) {
						iziToast.error({ title: e.message })
					}
				}}
				render={({ handleSubmit, submitting, values }) => (
					<SemanticForm onSubmit={handleSubmit}>
						<Segment piled>
							<Header size={'small'} style={style.header}>
								Login as a <span style={style.title}>{title}</span>
							</Header>

							{/* input fields */}
							<Field name={'email'} validate={composeValidators(required, email)}>
								{({ input, meta }) => (
									<CustomInput
										input={input}
										meta={meta}
										icon={'user'}
										placeholder={'Email address'}
										iconPosition={'left'}
									/>
								)}
							</Field>
							<Field name={'password'} validate={required}>
								{({ input, meta }) => (
									<CustomInput
										input={input}
										meta={meta}
										type={'password'}
										icon={'lock'}
										placeholder={'Password'}
										iconPosition={'left'}
									/>
								)}
							</Field>

							<Button
								type={'submit'}
								onClick={() => console.log('clicked submit')}
								disabled={submitting}
								fluid
								size={'large'}
								style={style.button}>
								Login
							</Button>
						</Segment>
					</SemanticForm>
				)}
			/>
		)}
	</ApolloConsumer>
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
