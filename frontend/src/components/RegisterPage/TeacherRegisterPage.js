import React from 'react'
import { Container, Header, Grid, Image } from 'semantic-ui-react'
import TeacherRegisterForm from './TeacherRegisterForm'

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
				<TeacherRegisterForm history={props.history} />
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
