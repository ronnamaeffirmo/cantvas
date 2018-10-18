import React from 'react'
import { Grid, Button, Header } from 'semantic-ui-react'

const LoginPage = props => {
	return (
		<Grid
			columns="equal"
			style={{ height: '100vh', backgroundColor: '#2a474b', margin: 0 }}>
			<Grid.Row style={{ width: '100vh' }}>
				<Grid.Column textAlign="right" verticalAlign="middle">
					<Button
						content="Teacher"
						style={{ margin: 0, padding: 90, fontSize: 50 }}
					/>
				</Grid.Column>
				<Grid.Column textAlign="center" style={{ marginTop: 150 }}>
					<Header style={{ fontSize: 100 }} textAlign="center">
						LOGIN
					</Header>
				</Grid.Column>
				<Grid.Column textAlign="left" verticalAlign="middle">
					<Button
						content="Student"
						style={{ margin: 0, padding: 90, fontSize: 50 }}
					/>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default LoginPage
