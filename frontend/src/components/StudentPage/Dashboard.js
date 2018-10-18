import React from 'react'
import { Menu, Header, Card, Grid, Button, Container } from 'semantic-ui-react'

const placeholder = ['', '', '', '', '', '', '']
let int = 0

const dashboard = props => {
	return (
		<div>
			<Menu pointing secondary>
				<Menu.Item disabled>
					<Header size="huge">Dashboard</Header>
				</Menu.Item>
			</Menu>
			<Grid columns="6">
				<Grid.Row>
					{placeholder.map(exam => {
						return (
							<Grid.Column key={int++} style={{ marginBottom: '20px' }}>
								<Card centered>
									<Card.Content>
										<Container textAlign="center">
											<Header size="medium" style={{ margin: 0 }}>
												Exam Name
											</Header>
											<br />
											<Header size="small" style={{ margin: 0 }}>
												Subject Name
											</Header>
										</Container>
									</Card.Content>
									<Card.Content>
										<Container textAlign="center">
											<Button content="Take Test" positive />
										</Container>
									</Card.Content>
								</Card>
							</Grid.Column>
						)
					})}
				</Grid.Row>
			</Grid>
		</div>
	)
}

export default dashboard
