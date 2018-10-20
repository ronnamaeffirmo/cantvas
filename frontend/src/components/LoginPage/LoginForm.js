import React from 'react'
import { Form as SemanticForm, Segment, Button, Header } from 'semantic-ui-react'
import { Form, Field } from 'react-final-form'
import { ApolloConsumer } from 'react-apollo'
import iziToast from 'izitoast'
import gql from 'graphql-tag'

import CustomInput from '../CustomInput'
import { required, composeValidators, email } from '../../helpers/validationHelper'

const loginStudent = gql`
	mutation student($email: String!, $password: String!) {
		studentLogin(email: $email, password: $password) {
			student {
				email
			}
		}
	}
`

const teacherLogin = gql`
	mutation teacherLogin($email: String!, $password: String!) {
		teacherLogin(email: $email, password: $password) {
			teacher {
				email
			}
		}
	}
`

const LoginForm = ({ title, history }) => (
	<ApolloConsumer>
		{client => (
			<Form
				onSubmit={async values => {
					try {
						const mutation = title === 'student' ? loginStudent : teacherLogin
						const result = await client.mutate({ mutation, variables: values })
						const dataTitle = title === 'student' ? 'userStudent' : 'userTeacher'
						client.writeData({
							data: { [`${dataTitle}`]: result.data[`${title}Login`][`${title}`].email }
						})
						history.push({ pathname: `/${title}/dashboard` })
					} catch (e) {
						iziToast.error({ title: 'Oops! Something went wrong..', message: e.message })
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
