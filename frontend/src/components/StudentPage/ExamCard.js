import React from 'react'
import { Card, Container, Header, Button } from 'semantic-ui-react'

const ExamCard = props => {
	return (
		<Card centered>
			<Card.Content>
				<Container textAlign="center">
					<Header size="medium" style={style.header}>
						{props.title}
					</Header>
					<br />
					<Header size="small" style={style.header}>
						{props.subject}
					</Header>
					<Header size="small" style={style.header}>
						{props.teacher}
					</Header>
				</Container>
			</Card.Content>
			<Card.Content>
				<Container textAlign="center">
					<Button content="Take Test" positive />
				</Container>
			</Card.Content>
		</Card>
	)
}

const style = {
	header: {
		margin: 0
	}
}

export default ExamCard
