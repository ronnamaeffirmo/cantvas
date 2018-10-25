const jwt = require('jsonwebtoken')

const APP_SECRET = 'himarkimronna'
const STUDENT = 'student'
const TEACHER = 'teacher'

module.exports = {
	APP_SECRET,
	STUDENT,
	TEACHER,
	getStudentId(context) {
		const Authorization = context.request.get('Authorization')
		if (Authorization) {
			const token = Authorization.replace('Bearer ', '')
			const { studentId } = jwt.verify(token, APP_SECRET)

			return studentId
		}

		throw new Error('Student not authenticated')
	},
	getTeacherId(context) {
		const Authorization = context.request.get('Authorization')
		if (Authorization) {
			const token = Authorization.replace('Bearer ', '')
			const { teacherId } = jwt.verify(token, APP_SECRET)

			return teacherId
		}

		throw new Error('Teacher not authenticated')
	},
	verifyOwner(loggedInUserId, id) {
		if (loggedInUserId !== id) {
			throw new Error('Permission denied!')
		}
	},
	validateId(id, type) {
		if (!id) {
			throw new Error(`Authentication required for ${type}`)
		}
	},
	determineRole(studentId, teacherId) {
		if (studentId && !teacherId) {
			return { type: STUDENT, id: studentId }
		} else if (teacherId && !studentId) {
			return { type: TEACHER, id: teacherId }
		} else {
			throw new Error('Could not determine role!')
		}
	}
}
