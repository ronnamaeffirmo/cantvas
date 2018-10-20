import React from 'react'
import { Button } from 'semantic-ui-react'
import { Form, Field } from 'react-final-form'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
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

const studentLoginForm = props => (
	<ApolloConsumer>
		{client => (
			<Form
				onSubmit={async values => {
					const student = await client.mutate({ mutation: loginStudent, variables: values })
					client.writeData({ data: { userStudent: student.data.studentLogin.student.email } })
					props.history.push({
						pathname: '/student/dashboard'
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

export default studentLoginForm
