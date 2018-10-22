import gql from 'graphql-tag'
import iziToast from 'izitoast'

const scoreExists = gql`
	query scoreExists($examId: ID!) {
		scores(where: { exam: { id: $examId } }) {
			id
		}
	}
`

const getStudent = gql`
	{
		userStudent @client
	}
`

const updateStudent = gql`
	mutation updateStudent($id: ID!, $score: Int!, $examId: ID!) {
		updateStudent(
			where: { id: $id }
			data: { scores: { create: { score: $score, exam: { connect: { id: $examId } } } } }
		) {
			id
			name
		}
	}
`

export const submitExam = async (exam, values, client) => {
	let score = 0
	exam.questions.map(({ answer, id }) => {
		if (values[id] === answer) {
			score++
		}
	})

	try {
		const loggedIn = await client.query({ query: getStudent })
		if (!loggedIn.data) throw new Error('No student is logged in!')

		const examScore = await client.query({ query: scoreExists, variables: { examId: exam.id } })
		if (examScore.data.scores.length) throw new Error('Score exists! Already taken the exam...')

		const student = await client.mutate({
			mutation: updateStudent,
			variables: {
				id: loggedIn.data.userStudent,
				score,
				examId: exam.id
			}
		})

		if (student.data) iziToast.success({ title: 'Sucessfully submitted exam!' })
	} catch (e) {
		iziToast.error({ title: e.message })
	}
}
