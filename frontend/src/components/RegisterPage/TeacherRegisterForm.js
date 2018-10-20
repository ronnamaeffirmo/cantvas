import React from 'react'
import { Button } from 'semantic-ui-react'
import { Form, Field } from 'react-final-form'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import {
	required,
	composeValidators,
	mustBeNumber,
	minValue,
	email
} from '../../helpers/validationHelper'

const createTeacher = gql`
	mutation teacher($data: TeacherCreateInput!) {
		createTeacher(data: $data) {
			token
		}
	}
`

const teacherRegistForm = props => (
	<ApolloConsumer>
		{client => (
			<Form
				onSubmit={async values => {
					await client.mutate({ mutation: createTeacher, variables: { data: values } })
					props.history.push('/login')
				}}
				render={({ handleSubmit, submitting, values }) => (
					<form onSubmit={handleSubmit}>
						<Field name={'name'} validate={required}>
							{({ input, meta }) => (
								<div>
									<label>Name</label>
									<input {...input} type={'text'} placeholder={'Name'} />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>
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
						<Field name={'age'} validate={composeValidators(required, mustBeNumber, minValue(10))}>
							{({ input, meta }) => (
								<div>
									<label>Age</label>
									<input {...input} type={'text'} placeholder={'Age'} />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>
						<Field name={'class'} validate={required}>
							{({ input, meta }) => (
								<div>
									<label>Class</label>
									<input {...input} type={'text'} placeholder={'Class'} />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>
						<Field name={'gender'} validate={required}>
							{({ input, meta }) => (
								<div>
									<label>Gender</label>
									<select {...input} name={'gender'}>
										<option value={''} disabled defaultValue hidden>
											gender
										</option>
										<option value={'MALE'}>MALE</option>
										<option value={'FEMALE'}>FEMALE</option>
									</select>
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

export default teacherRegistForm
