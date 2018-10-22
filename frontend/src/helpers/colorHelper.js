import colors from '../constants/colors'

const getBackgroundColor = (name, activeItem) => (name === activeItem ? 'white' : '#2a474b')

const getFontColor = (name, activeItem) => (name === activeItem ? '#2a474b' : 'white')

const getRandomColor = () => {
	const random = Math.floor(Math.random() * 12)
	return colors[random]
}

export { getBackgroundColor, getFontColor, getRandomColor }
