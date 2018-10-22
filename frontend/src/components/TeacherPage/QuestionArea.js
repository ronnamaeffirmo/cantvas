import React from 'react'
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
	<Query query={getNumbers}>
		{({ data: { questionNumber, choiceNumber } }) => {
			if (questionNumber) {
				const questions = Array(questionNumber)
					.fill()
					.map((e, num) => num + 1)
				const choices = Array(choiceNumber)
					.fill()
					.map((e, num) => num + 1)

				return <ExamForm questions={questions} choices={choices} {...props} />
			}
			return null
		}}
	</Query>
)

export default QuestionArea
