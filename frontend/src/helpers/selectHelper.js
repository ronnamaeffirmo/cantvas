const getOptions = input => {
	return input.map(data => {
		return { key: data, value: data, text: data }
	})
}

const getNumberOptions = input => {
	return Array(input)
		.fill()
		.map((e, i) => {
			const num = i + 1
			return { key: num, value: num, text: num }
		})
}

export { getOptions, getNumberOptions }
