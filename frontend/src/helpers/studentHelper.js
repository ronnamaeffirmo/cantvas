import years from '../constants/years'

export const getNumeralYearEquivalent = key => {
	const year = years.find(year => year.key === key)
	return year.equivalent
}
