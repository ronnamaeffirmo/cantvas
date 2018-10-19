import React from 'react'
import { Container, Header, Grid, Image } from 'semantic-ui-react'
import { Form, Field } from 'react-final-form'

const registerPage = props => {
	return (
		<Container fluid style={{ height: '100vh', width: '100%', backgroundColor: '#2a474b' }}>
			<Container style={{ height: '10vh', width: '100%', backgroundColor: 'white' }}>
				<Grid style={{ height: '100%', width: '100%' }}>
					<Grid.Row>
						<Grid.Column style={{ height: '100%' }} width={1}>
							<Image
								src={require('../../images/logo.png')}
								style={{ height: '100%', marginLeft: 20, marginTop: 5 }}
							/>
						</Grid.Column>
						<Grid.Column width={15} verticalAlign="middle">
							<Header size="huge">Registration Page</Header>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
			<Container
				textAlign="center"
				style={{ backgroundColor: 'white', width: '30%', marginTop: 20 }}>
				<Form
					onSubmit={e => console.log(e)}
					render={({ handleSubmit, reset, submitting, pristine, values }) => (
						<form onSubmit={handleSubmit}>
							<Field name="name">
								{({ input }) => (
									<div>
										<label>Name</label>
										<input {...input} type="text" placeholder="Name" />
									</div>
								)}
							</Field>
							<Field name="email">
								{({ input }) => (
									<div>
										<label>Email</label>
										<input {...input} type="email" placeholder="email" />
									</div>
								)}
							</Field>
							<Field name="age">
								{({ input }) => (
									<div>
										<label>Age</label>
										<input {...input} type="text" placeholder="Age" />
									</div>
								)}
							</Field>
							<Field name="gender">
								{({ input }) => (
									<div>
										<label>Gender</label>
										<select {...input} name="gender">
											<option value="" disabled defaultValue hidden>
												gender
											</option>
											<option value="MALE">MALE</option>
											<option value="FEMALE">FEMALE</option>
										</select>
									</div>
								)}
							</Field>
							<Field name="course">
								{({ input }) => (
									<div>
										<label>Course</label>
										<select {...input} name="course">
											<option value="" disabled defaultValue hidden>
												course
											</option>
											<option value="BSSE">BSSE</option>
											<option value="BSCE">BSCE</option>
											<option value="BSME">BSME</option>
											<option value="BSPKG">BSPKG</option>
											<option value="BSEE">BSEE</option>
											<option value="BSECE">BSECE</option>
											<option value="BSCHE">BSCHE</option>
										</select>
									</div>
								)}
							</Field>
							<Field name="year">
								{({ input }) => (
									<div>
										<label>Year</label>
										<select {...input} name="year">
											<option value="" disabled defaultValue hidden>
												year
											</option>
											<option value="FIRST_YEAR">FIRST YEAR</option>
											<option value="SECOND_YEAR">SECOND YEAR</option>
											<option value="THIRD_YEAR">THIRD YEAR</option>
											<option value="FOURTH_YEAR">FOURTH YEAR</option>
											<option value="FIFTH_YEAR">FIFTH YEAR</option>
										</select>
									</div>
								)}
							</Field>
							<div className="buttons">
								<button type="submit" disabled={submitting}>
									Submit
								</button>
							</div>
							<pre>{JSON.stringify(values, 0, 2)}</pre>
						</form>
					)}
				/>
			</Container>
			<Container
				style={{
					height: '10vh',
					width: '100%',
					backgroundColor: 'black',
					position: 'absolute',
					bottom: 0
				}}
			/>
		</Container>
	)
}

export default registerPage
