import React from 'react'
import { Menu, Header, Card, Grid, Button, Container } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ExamCard from './ExamCard'

const placeholder = ['', '', '', '', '', '', '']
let int = 0

const Dashboard = props => {
	return (
		<div>
			<Menu pointing secondary>
				<Menu.Item disabled>
					<Header size="huge">Dashboard</Header>
				</Menu.Item>
			</Menu>
			<Grid columns="6">
				<Grid.Row>
					{placeholder.map(exam => (
						<Grid.Column key={int++} style={style.column}>
							<ExamCard />
						</Grid.Column>
					))}
				</Grid.Row>
			</Grid>
		</div>
	)
}

const style = {
	column: {
		marginBottom: '20px'
	}
}

export default Dashboard
