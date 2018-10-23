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

const createTeacher = gql`
	mutation teacher($data: TeacherCreateInput!) {
		createTeacher(data: $data) {
			token
		}
	}
`

// TODO: refactor, one form, different fields
const TeacherRegisterForm = ({ title, history }) => (
	<ApolloConsumer>
		{client => (
			<Form
				onSubmit={async values => {
					// TODO: separate
					try {
						const teacher = await client.mutate({
							mutation: createTeacher,
							variables: { data: values }
						})
						const { token } = teacher.data.createTeacher

						storeUser(token)
						iziToast.success({ title: 'Registration success!' })
						history.push('/teacher/dashboard')
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
							<Field name={'class'} validate={required}>
								{({ input, meta }) => (
									<CustomInput
										input={input}
										meta={meta}
										type={'text'}
										icon={'group'}
										placeholder={'class'}
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

export default TeacherRegisterForm
