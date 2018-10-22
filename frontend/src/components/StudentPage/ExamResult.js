import React from 'react'
import { Modal, Statistic, Icon, Button } from 'semantic-ui-react'

import { getRate } from '../../helpers/examHelper'

const ExamResult = ({
	location: {
		state: { exam, score }
	},
	history
}) => (
	<Modal size={'tiny'} open centered={false} style={style.model}>
		<Modal.Header>{exam.title} result</Modal.Header>
		<Modal.Content style={style.content}>
			<Statistic.Group widths={3} color={'red'}>
				<Statistic>
					<Statistic.Value>{getRate(score, exam.questions.length)}%</Statistic.Value>
					<Statistic.Label>
						<Icon name={'line graph'} /> Rate
					</Statistic.Label>
				</Statistic>
				<Statistic>
					<Statistic.Value>{score}</Statistic.Value>
					<Statistic.Label>
						<Icon name={'checkmark'} /> Correct Answers
					</Statistic.Label>
				</Statistic>
				<Statistic>
					<Statistic.Value>{exam.questions.length}</Statistic.Value>
					<Statistic.Label>
						<Icon name={'question circle'} /> Questions
					</Statistic.Label>
				</Statistic>
			</Statistic.Group>
			<Button style={style.button} onClick={() => history.push('/student/dashboard')}>
				Okay
			</Button>
		</Modal.Content>
	</Modal>
)

const style = {
	model: {
		maxHeight: '20vh'
	},
	content: {
		textAlign: 'center'
	},
	button: {
		marginTop: '25px'
	}
}

export default ExamResult
