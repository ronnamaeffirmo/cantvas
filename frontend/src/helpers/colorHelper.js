export const getBackgroundColor = (name, activeItem) => {
	if (name === activeItem) {
		return 'white'
	}
	return '#2a474b'
}

export const getFontColor = (name, activeItem) => {
	if (name === activeItem) {
		return '#313a96'
	}
	return 'white'
}

export const getRandomColor = () => {
	const colors = [
		'red',
		'orange',
		'yellow',
		'olive',
		'green',
		'teal',
		'blue',
		'violet',
		'purple',
		'pink',
		'brown',
		'grey'
	]

	const random = Math.floor(Math.random() * 12)
	return colors[random]
}
