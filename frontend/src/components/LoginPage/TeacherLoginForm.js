import React from 'react'
import { Button } from 'semantic-ui-react'
import { Form, Field } from 'react-final-form'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { required, composeValidators, email } from '../../helpers/validationHelper'

const teacherLogin = gql`
	mutation teacherLogin($email: String!, $password: String!) {
		teacherLogin(email: $email, password: $password) {
			teacher {
				email
			}
		}
	}
`

const teacherLoginForm = props => (
	<ApolloConsumer>
		{client => (
			<Form
				onSubmit={async values => {
					const teacher = await client.mutate({ mutation: teacherLogin, variables: values })
					client.writeData({ data: { userTeacher: teacher.data.teacherLogin.teacher.email } })
					props.history.push({
						pathname: '/teacher/dashboard'
					})
				}}
				render={({ handleSubmit, submitting, values }) => (
					<form onSubmit={handleSubmit}>
						<Field name={'email'} validate={composeValidators(required, email)}>
							{({ input, meta }) => (
								<div>
									<label>Email</label>
									<input {...input} type={'email'} placeholder={'email'} />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>
						<Field name={'password'} validate={required}>
							{({ input, meta }) => (
								<div>
									<label>Password</label>
									<input {...input} type={'text'} placeholder={'Password'} />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>
						<div className={'buttons'}>
							<Button type={'submit'} disabled={submitting}>
								Submit
							</Button>
						</div>
						<pre>{JSON.stringify(values, 0, 2)}</pre>
					</form>
				)}
			/>
		)}
	</ApolloConsumer>
)

export default teacherLoginForm
