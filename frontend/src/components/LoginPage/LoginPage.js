import React from 'react'
import { Grid, Button } from 'semantic-ui-react'

const LoginPage = props => {
	return (
		<Grid columns="equal">
			<Grid.Row>
				<Grid.Column>
					<Button content="Teacher" />
				</Grid.Column>
				<Grid.Column>
					<Button content="Student" />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default LoginPage
