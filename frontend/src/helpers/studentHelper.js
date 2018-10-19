export const getNumeralYearEquivalent = key => {
	const years = [
		{ key: 'FIRST_YEAR', equivalent: 1 },
		{ key: 'SECOND_YEAR', equivalent: 2 },
		{ key: 'THIRD_YEAR', equivalent: 3 },
		{ key: 'FOURTH_YEAR', equivalent: 4 },
		{ key: 'FIFTH_YEAR', equivalent: 5 }
	]

	const year = years.find(year => year.key === key)
	return year.equivalent
}
