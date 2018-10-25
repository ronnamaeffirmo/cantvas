import gql from 'graphql-tag'

const queryStudent = gql`
	query {
		loggedInStudent {
			id
			answers {
				id
				exam {
					id
				}
				question {
					id
				}
			}
		}
	}
`

const updateStudent = gql`
	mutation updateStudent($data: StudentUpdateInput!) {
		updateLoggedInStudent(data: $data) {
			id
		}
	}
`

export const handleOnchange = async (client, examId, questionId, choiceId, value, input) => {
	const student = await client.query({ query: queryStudent })
	const { answers } = student.data.loggedInStudent

	let data
	if (answers.length === 0) {
		data = {
			answers: {
				create: {
					exam: { connect: { id: examId } },
					question: { connect: { id: questionId } },
					answer: { connect: { id: choiceId } }
				}
			}
		}
	} else {
		const index = answers.findIndex(answer => answer.exam.id === examId)
		data = {
			answers: {
				update: {
					where: { id: answers[index].id },
					data: {
						answer: { connect: { id: choiceId } },
						question: { connect: { id: questionId } },
						exam: { connect: { id: examId } }
					}
				}
			}
		}
	}

	console.log('data', data)

	await client.mutate({
		mutation: updateStudent,
		variables: { data }
	})

	return input.onChange(value)
}
