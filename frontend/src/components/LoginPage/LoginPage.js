import React from 'react'
import { Grid, Button, Header } from 'semantic-ui-react'

const LoginPage = props => {
	return (
		<Grid columns={'equal'} style={style.grid}>
			<Grid.Row style={style.row}>
				<Grid.Column textAlign={'right'} verticalAlign={'middle'}>
					<Button
						content={'Teacher'}
						style={style.button}
						onClick={() => props.history.push('/teacherRegister')}
					/>
				</Grid.Column>
				<Grid.Column textAlign={'center'} style={style.middleColumn}>
					<Header style={style.header} textAlign={'center'}>
						LOGIN
					</Header>
				</Grid.Column>
				<Grid.Column textAlign={'left'} verticalAlign={'middle'}>
					<Button
						content={'Student'}
						style={style.button}
						onClick={() => props.history.push('/studentRegister')}
					/>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

const style = {
	grid: {
		height: '100vh',
		backgroundColor: '#2a474b',
		margin: 0
	},
	row: {
		width: '100vh'
	},
	middleColumn: {
		marginTop: 150
	},
	header: {
		fontSize: 100
	},
	button: {
		margin: 0,
		padding: 90,
		fontSize: 50
	}
}

export default LoginPage
