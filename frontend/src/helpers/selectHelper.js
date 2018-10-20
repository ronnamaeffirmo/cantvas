const getOptions = input => {
	return input.map(data => {
		return { key: data.name, value: data.name, text: data.name }
	})
}

export { getOptions }
