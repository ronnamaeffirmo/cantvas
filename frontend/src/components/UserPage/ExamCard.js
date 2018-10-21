import React from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getRandomColor } from '../../helpers/colorHelper'
import { ApolloConsumer } from 'react-apollo'

const ExamCard = ({ questions, title, subject, text, link }) => {
	const highlightColor = getRandomColor()
	return (
		<ApolloConsumer>
			{client => (
				<Card color={highlightColor}>
					<div style={style.thumbnail(highlightColor)} />
					<Card.Content>
						<Card.Header>{title}</Card.Header>
						<Card.Meta>
							<Icon name={'book'} /> {subject}
						</Card.Meta>
					</Card.Content>
					<Card.Content extra textAlign={'right'}>
						<Button
							size={'small'}
							basic
							color={highlightColor}
							as={Link}
							to={link} // to change
							onClick={() => client.writeData({ data: { questions: questions } })}>
							{text}
						</Button>
					</Card.Content>
				</Card>
			)}
		</ApolloConsumer>
	)
}

const style = {
	thumbnail(highlightColor) {
		return {
			height: '150px',
			backgroundColor: highlightColor
		}
	}
}

export default ExamCard
