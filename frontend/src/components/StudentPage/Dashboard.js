import React, { Fragment } from 'react'
import { Header, Divider, Card } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ExamCard from './ExamCard'

const placeholder = ['', '', '', '', '', '', '']

const Dashboard = props => {
	return (
		<Fragment>
			<div style={style.pageTitle}>
				<Header size="huge" style={style.header}>
					Dashboard
				</Header>
				<Divider />
			</div>
			<Card.Group itemsPerRow={4}>
				{placeholder.map(exam => (
					<ExamCard />
				))}
			</Card.Group>
		</Fragment>
	)
}

const style = {
	pageTitle: {
		marginBottom: '25px'
	},
	header: {
		fontWeight: 'normal'
	}
}

export default Dashboard
