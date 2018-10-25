import React from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'
import { Link, Route } from 'react-router-dom'
import { ApolloConsumer } from 'react-apollo'

import PublishButton from '../TeacherPage/PublishButton'
import { getRandomColor } from '../../helpers/colorHelper'

const ExamCard = ({ questions, title, subject, text, link, examId, publishStatus }) => {
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
						<Route
							path={'/teacher'}
							render={() => (
								<PublishButton
									highlightColor={highlightColor}
									examId={examId}
									client={client}
									status={publishStatus}
								/>
							)}
						/>
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
