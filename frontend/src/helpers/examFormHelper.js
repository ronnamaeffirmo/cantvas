const getArray = (questions, choices, values) => {
	const letters = ['A', 'B', 'C', 'D', 'E', 'F']
	const output = []
	for (let i = 1; i <= questions.length; i++) {
		const question = {
			question: values[`question${i}`],
			answer: letters[parseInt(values[`answer${i}`].slice(-1)) - 1],
			choices: { create: [] }
		}
		for (let j = 1; j <= choices.length; j++) {
			const text = `choice${i}-${j}`
			const choice = values[text]
			question.choices.create.push({
				key: letters[j - 1],
				value: choice
			})
		}
		output.push(question)
	}
	return output
}

export { getArray }
