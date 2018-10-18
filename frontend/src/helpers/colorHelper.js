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
