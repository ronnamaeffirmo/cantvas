import gql from 'graphql-tag'
import iziToast from 'izitoast'

const scoreExists = gql`
	query scoreExists($examId: ID!) {
		scores(where: { exam: { id: $examId } }) {
			id
		}
	}
`

const updateLoggedInStudent = gql`
	mutation updateLoggedInStudent($score: Int!, $examId: ID!) {
		updateLoggedInStudent(
			data: { scores: { create: { score: $score, exam: { connect: { id: $examId } } } } }
		) {
			id
			name
		}
	}
`

const submitExam = async (exam, values, client, history) => {
	let score = 0
	exam.questions.map(({ answer, id }) => {
		if (values[id] === answer) {
			score++
		}
	})

	try {
		const examScore = await client.query({
			query: scoreExists,
			variables: { examId: exam.id }
		})

		if (examScore.data.scores.length > 0) {
			throw new Error('Score exists! Already taken the exam...')
		}

		const student = await client.mutate({
			mutation: updateLoggedInStudent,
			variables: { score, examId: exam.id }
		})

		if (student.data) {
			iziToast.success({ title: 'Sucessfully submitted exam!' })
			history.push({
				pathname: `/student/exam/${exam.id}/result`,
				state: { exam, score }
			})
		}
	} catch (e) {
		iziToast.error({ title: e.message })
	}
}

const getRate = (correct, questions) => {
	return Math.round((correct / questions) * 100)
}

export { submitExam, getRate }
