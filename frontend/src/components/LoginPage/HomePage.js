import React from 'react'
import { Grid, Button } from 'semantic-ui-react'

const LoginPage = props => {
	return (
		<Grid columns={'equal'} style={style.grid}>
			<Grid.Row style={style.row}>
				<Grid.Column textAlign={'right'} verticalAlign={'middle'}>
					<Button
						content={'Login as Teacher'}
						style={style.button}
						onClick={() => props.history.push('/teacherRegister')}
					/>
					<Button
						content={'Register as Teacher'}
						style={style.button}
						onClick={() => props.history.push('/teacherRegister')}
					/>
				</Grid.Column>
				<Grid.Column textAlign={'left'} verticalAlign={'middle'}>
					<Button
						content={'Login as Student'}
						style={style.button}
						onClick={() => props.history.push('/studentLogin')}
					/>
					<Button
						content={'Register as Student'}
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
		marginTop: 10,
		padding: 90,
		fontSize: 50
	}
}

export default LoginPage
