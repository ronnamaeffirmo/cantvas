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

const createStudent = gql`
	mutation student($data: StudentCreateInput!) {
		createStudent(data: $data) {
			student {
				email
			}
		}
	}
`

const studentForm = props => (
	<ApolloConsumer>
		{client => (
			<Form
				onSubmit={async values => {
					const student = await client.mutate({
						mutation: createStudent,
						variables: { data: values }
					})
					client.writeData({
						data: { userStudent: student.data.createStudent.student.email }
					})
					props.history.push({
						pathname: '/student/dashboard'
					})
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
						<Field name={'course'} validate={required}>
							{({ input, meta }) => (
								<div>
									<label>Course</label>
									<select {...input} name={'course'}>
										<option value={''} disabled defaultValue hidden>
											course
										</option>
										<option value={'BSSE'}>BSSE</option>
										<option value={'BSCE'}>BSCE</option>
										<option value={'BSME'}>BSME</option>
										<option value={'BSPKG'}>BSPKG</option>
										<option value={'BSEE'}>BSEE</option>
										<option value={'BSECE'}>BSECE</option>
										<option value={'BSCHE'}>BSCHE</option>
									</select>
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>
						<Field name={'year'} validate={required}>
							{({ input, meta }) => (
								<div>
									<label>Year</label>
									<select {...input} name={'year'}>
										<option value={''} disabled defaultValue hidden>
											year
										</option>
										<option value={'FIRST_YEAR'}>FIRST YEAR</option>
										<option value={'SECOND_YEAR'}>SECOND YEAR</option>
										<option value={'THIRD_YEAR'}>THIRD YEAR</option>
										<option value={'FOURTH_YEAR'}>FOURTH YEAR</option>
										<option value={'FIFTH_YEAR'}>FIFTH YEAR</option>
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

export default studentForm
