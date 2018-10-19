module.exports = {
	required: value => (value ? undefined : 'Required'),
	mustBeNumber: value => (isNaN(value) ? 'Must be a number' : undefined),
	minValue: min => value =>
		isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`,
	email: value =>
		value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
			? 'Invalid email address'
			: undefined,
	composeValidators: (...validators) => value =>
		validators.reduce((error, validator) => error || validator(value), undefined)
}
