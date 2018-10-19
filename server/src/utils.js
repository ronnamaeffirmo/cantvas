const jwt = require('jsonwebtoken')
const APP_SECRET = 'himarkimronna'

module.exports = {
	APP_SECRET,
	getStudentId(context) {
		const Authorization = context.request.get('Authorization')
		if (Authorization) {
			const token = Authorization.replace('Bearer', '')
			const { studentId } = jwt.verify(token, APP_SECRET)

			return studentId
		}

		throw new Error('Student not authenticated')
	},
	getTeacherId(context) {
		const Authorization = context.request.get('Authorization')
		if (Authorization) {
			const token = Authorization.replace('Bearer', '')
			const { teacherId } = jwt.verify(token, APP_SECRET)

			return teacherId
		}

		throw new Error('Teacher not authenticated')
	}
}
