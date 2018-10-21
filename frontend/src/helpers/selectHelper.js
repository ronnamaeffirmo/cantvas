const getOptions = input => {
	return input.map(data => {
		return { key: data, value: data, text: data }
	})
}

export { getOptions }
