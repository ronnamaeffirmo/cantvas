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

const createTeacher = gql`
	mutation teacher($data: TeacherCreateInput!) {
		createTeacher(data: $data) {
			teacher {
				id
			}
		}
	}
`

const TeacherRegisterForm = ({ title, history }) => (
	<ApolloConsumer>
		{client => (
			<Form
				onSubmit={async values => {
					try {
						const teacher = await client.mutate({
							mutation: createTeacher,
							variables: { data: values }
						})
						client.writeData({
							data: { userTeacher: teacher.data.createTeacher.teacher.id }
						})
						history.push({
							pathname: '/teacher/dashboard'
						})
					} catch (e) {
						iziToast.error({ title: 'Oops! Something went wrong..', message: e.message })
					}
				}}
				render={({ handleSubmit, submitting }) => (
					<SemanticForm onSubmit={handleSubmit}>
						<Segment piled>
							<Header size={'small'} style={style.header}>
								Login as a <span style={style.title}>{title}</span>
							</Header>

							{/* input fields */}
							<Field name={'name'} validate={required}>
								{({ input, meta }) => (
									<CustomInput input={input} meta={meta} icon={'user'} placeholder={'Name'} />
								)}
							</Field>
							<Field name={'email'} validate={composeValidators(required, email)}>
								{({ input, meta }) => (
									<CustomInput
										input={input}
										meta={meta}
										icon={'mail'}
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
									/>
								)}
							</Field>
							<Field name={'gender'} validate={required}>
								{({ input, meta }) => (
									<CustomSelect
										input={input}
										meta={meta}
										title={'gender'}
										array={['MALE', 'FEMALE']}
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
