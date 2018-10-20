import React from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getRandomColor } from '../../helpers/colorHelper'
import { ApolloConsumer } from 'react-apollo'
const highlightColor = getRandomColor()

const ExamCard = ({ questions, title, subject, teacher }) => {
	return (
		<ApolloConsumer>
			{client => (
				<Card color={highlightColor}>
					<div style={style.thumbnail} />
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
							to={'/student/exam'}
							onClick={() => client.writeData({ data: { questions: questions } })}>
							Take test
						</Button>
					</Card.Content>
				</Card>
			)}
		</ApolloConsumer>
	)
}

const style = {
	thumbnail: {
		height: '150px',
		backgroundColor: highlightColor
	}
}

export default ExamCard
