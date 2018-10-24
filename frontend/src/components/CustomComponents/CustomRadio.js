import React from 'react'
import { Form } from 'semantic-ui-react'
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
	mutation updateStudent($data: StudentUpdateInput!, $where: StudentWhereUniqueInput!) {
		updateStudent(data: $data, where: $where) {
			id
		}
	}
`

const CustomRadio = props => {
	const { input, value, label, client, examId, questionId, choiceId, previousChoice } = props
	const isDefault = input.value === '' && value === previousChoice
	return (
		<Form.Radio
			{...input}
			label={label}
			value={value}
			checked={isDefault || input.value === value}
			onChange={async (e, { value }) => {
				const student = await client.query({ query: queryStudent })
				const studentId = student.data.loggedInStudent.id
				const studentAnswers = student.data.loggedInStudent.answers
				let data
				if (studentAnswers.length === 0) {
					data = {
						answers: {
							create: {
								exam: {
									connect: { id: examId }
								},
								question: {
									connect: { id: questionId }
								},
								answer: {
									connect: { id: choiceId }
								}
							}
						}
					}
				} else {
					const index = studentAnswers.findIndex(answer => answer.exam.id === examId)
					data = {
						answers: {
							update: {
								where: {
									id: studentAnswers[index].id
								},
								data: {
									answer: {
										connect: {
											id: choiceId
										}
									},
									question: {
										connect: {
											id: questionId
										}
									},
									exam: {
										connect: {
											id: examId
										}
									}
								}
							}
						}
					}
				}
				await client.mutate({
					mutation: updateStudent,
					variables: { where: { id: studentId }, data: data }
				})
				return input.onChange(value)
			}}
		/>
	)
}

export default CustomRadio
