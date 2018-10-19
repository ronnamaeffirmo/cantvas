import React from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'

import { getRandomColor } from '../../helpers/colorHelper'
const highlightColor = getRandomColor()

const ExamCard = ({ title, subject, teacher }) => {
	return (
		<Card color={highlightColor}>
			<div style={style.thumbnail} />
			<Card.Content>
				<Card.Header>{title}</Card.Header>
				<Card.Meta>
					<Icon name={'book'} /> {subject}
				</Card.Meta>
				<Card.Description>by {teacher}</Card.Description>
			</Card.Content>
			<Card.Content extra textAlign={'right'}>
				<Button size={'small'} basic color={highlightColor}>
					Take test
				</Button>
			</Card.Content>
		</Card>
	)
}

const style = {
	thumbnail: {
		height: '150px',
		backgroundColor: highlightColor
	}
}

export default ExamCard
