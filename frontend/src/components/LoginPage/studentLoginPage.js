import React from 'react'
import { Container, Header, Grid, Image, Button } from 'semantic-ui-react'
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

const registerPage = props => {
	return (
		<Container fluid style={style.container}>
			<Container style={style.header}>
				<Grid style={style.grid}>
					<Grid.Row>
						<Grid.Column style={style.gridColumn} width={1}>
							<Image src={require('../../images/logo.png')} style={style.image} />
						</Grid.Column>
						<Grid.Column width={15} verticalAlign={'middle'}>
							<Header size={'huge'}>Registration Page</Header>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
			<Container textAlign={'center'} style={style.form}>
				<ApolloConsumer>
					{client => (
						<Form
							onSubmit={async values => {
								const student = await client.mutate({ mutation: loginStudent, variables: values })
								client.writeData({ data: { user: student.data.studentLogin.student.email } })
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
			</Container>
			<Container style={style.footer} />
		</Container>
	)
}

const style = {
	footer: {
		height: '10vh',
		width: '100%',
		backgroundColor: 'black',
		position: 'absolute',
		bottom: 0
	},
	form: {
		backgroundColor: 'white',
		width: '30%',
		marginTop: 20
	},
	container: {
		height: '100vh',
		width: '100%',
		backgroundColor: '#2a474b'
	},
	header: {
		height: '10vh',
		width: '100%',
		backgroundColor: 'white'
	},
	grid: {
		height: '100%',
		width: '100%'
	},
	gridColumn: {
		height: '100%'
	},
	image: {
		height: '100%',
		marginLeft: 20,
		marginTop: 5
	}
}

export default registerPage
