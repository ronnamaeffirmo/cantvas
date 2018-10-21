import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ExamForm from './ExamForm'
const getNumbers = gql`
	{
		questionNumber @client
		choiceNumber @client
	}
`

const QuestionArea = props => (
	<Grid.Row>
		<Grid.Column>
			<Query query={getNumbers}>
				{({ data }) => {
					if (data.questionNumber) {
						const questions = Array(data.questionNumber)
							.fill()
							.map((e, num) => num + 1)
						const choices = Array(data.choiceNumber)
							.fill()
							.map((e, num) => num + 1)
						return <ExamForm questions={questions} choices={choices} {...props} />
					}
					return ''
				}}
			</Query>
		</Grid.Column>
	</Grid.Row>
)

export default QuestionArea
