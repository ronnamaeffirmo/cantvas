import React from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getRandomColor } from '../../helpers/colorHelper'
import { ApolloConsumer } from 'react-apollo'
import Route from 'react-router-dom/Route'

import gql from 'graphql-tag'

const updateExam = gql`
	mutation updateExam($id: ID!, $data: ExamUpdateInput!) {
		updateExam(where: { id: $id }, data: $data) {
			id
		}
	}
`

const PublishButton = ({ highlightColor, examId, status, client }) => {
	if (!status) {
		return (
			<Button
				size={'small'}
				basic
				color={highlightColor}
				onClick={async () => {
					await client.mutate({
						mutation: updateExam,
						variables: { id: examId, data: { published: true } }
					})
					window.location.reload()
				}}>
				Publish
			</Button>
		)
	}
	return (
		<Button
			size={'small'}
			basic
			color={highlightColor}
			onClick={async () => {
				await client.mutate({
					mutation: updateExam,
					variables: { id: examId, data: { published: false } }
				})
				window.location.reload()
			}}>
			Unpublish
		</Button>
	)
}
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
