import years from '../constants/years'

const getNumeralYearEquivalent = key => {
	const year = years.find(year => year.key === key)
	return year.equivalent
}

export { getNumeralYearEquivalent }
