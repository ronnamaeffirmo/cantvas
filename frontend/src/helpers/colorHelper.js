import colors from '../constants/colors'

export const getBackgroundColor = (name, activeItem) => (name === activeItem ? 'white' : '#2a474b')

export const getFontColor = (name, activeItem) => (name === activeItem ? '#2a474b' : 'white')

export const getRandomColor = () => {
	const random = Math.floor(Math.random() * 12)
	return colors[random]
}
