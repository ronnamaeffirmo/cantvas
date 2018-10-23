import React from 'react'
import { Form as SemanticForm, Segment, Button, Header } from 'semantic-ui-react'
import { Form, Field } from 'react-final-form'
import { ApolloConsumer } from 'react-apollo'
import iziToast from 'izitoast'
import gql from 'graphql-tag'

import CustomSelect from '../CustomComponents/CustomSelect'
import CustomInput from '../CustomComponents/CustomInput'

import {
	required,
	composeValidators,
	mustBeNumber,
	minValue,
	email
} from '../../helpers/validationHelper'
import { getOptions } from '../../helpers/selectHelper'
import { storeUser } from '../../helpers/authHelper'

const createStudent = gql`
	mutation student($data: StudentCreateInput!) {
		createStudent(data: $data) {
			token
		}
	}
`

// TODO: refactor, one form, different fields
const StudentRegisterForm = ({ title, history }) => (
	<ApolloConsumer>
		{client => (
			<Form
				onSubmit={async values => {
					try {
						// TODO: separate
						const student = await client.mutate({
							mutation: createStudent,
							variables: { data: values }
						})
						const { token } = student.data.createStudent

						storeUser(token)
						iziToast.success({ title: 'Registration success!' })
						history.push('/student/dashboard')
					} catch (e) {
						iziToast.error({ title: e.message })
					}
				}}
				render={({ handleSubmit, submitting }) => (
					<SemanticForm onSubmit={handleSubmit}>
						<Segment piled>
							<Header size={'small'} style={style.header}>
								Register as a <span style={style.title}>{title}</span>
							</Header>

							{/* input fields */}
							<Field name={'name'} validate={required}>
								{({ input, meta }) => (
									<CustomInput
										input={input}
										meta={meta}
										icon={'user'}
										placeholder={'Name'}
										iconPosition={'left'}
									/>
								)}
							</Field>
							<Field name={'email'} validate={composeValidators(required, email)}>
								{({ input, meta }) => (
									<CustomInput
										input={input}
										meta={meta}
										icon={'mail'}
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
							<Field
								name={'age'}
								validate={composeValidators(required, mustBeNumber, minValue(10))}>
								{({ input, meta }) => (
									<CustomInput
										input={input}
										meta={meta}
										type={'number'}
										icon={'calendar'}
										placeholder={'Age'}
										iconPosition={'left'}
									/>
								)}
							</Field>
							<Field name={'gender'} validate={required}>
								{({ input, meta }) => (
									<CustomSelect
										input={input}
										meta={meta}
										title={'gender'}
										options={getOptions(['MALE', 'FEMALE'])}
									/>
								)}
							</Field>
							<Field name={'course'} validate={required}>
								{({ input, meta }) => (
									<CustomSelect
										input={input}
										meta={meta}
										title={'course'}
										options={getOptions([
											'BSSE',
											'BSCE',
											'BSME',
											'BSPKG',
											'BSEE',
											'BSECE',
											'BSCHE'
										])}
									/>
								)}
							</Field>
							<Field name={'year'} validate={required}>
								{({ input, meta }) => (
									<CustomSelect
										input={input}
										meta={meta}
										title={'year'}
										options={getOptions([
											'FIRST_YEAR',
											'SECOND_YEAR',
											'THIRD_YEAR',
											'FOURTH_YEAR',
											'FIFTH_YEAR'
										])}
										icon={'calendar'}
									/>
								)}
							</Field>
							<Button
								type={'submit'}
								disabled={submitting}
								fluid
								size={'large'}
								style={style.button}>
								Submit
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

export default StudentRegisterForm
