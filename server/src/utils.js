const jwt = require('jsonwebtoken')

// constants
const APP_SECRET = 'himarkimronna'
const STUDENT = 'student'
const TEACHER = 'teacher'

// errors
const throwPermissionError = () => {
	throw new Error('permission denied')
}

const throwAuthError = type => {
	throw new Error(`${type} not authenticated`)
}

const throwRoleError = () => {
	throw new Error('could not determine role')
}

const throwFieldError = field => {
	throw new Error(`invalid field ${field}`)
}

// validations
const verifyOwner = (loggedInUserId, id) => {
	if (loggedInUserId !== id) {
		throwPermissionError()
	}
}

const validateId = (id, type) => {
	if (!id) {
		throwAuthError(type)
	}
}

const validateExam = (data, teacherId) => {
	const { title, subject, author, questions } = data

	if (!title) {
		throwFieldError('title')
	}

	if (!subject) {
		throwFieldError('subject')
	}

	if (author) {
		if (author.create) {
			throwPermissionError()
		}
		verifyOwner(teacherId, author.connect.id)
	}

	if (!questions) {
		throwFieldError('questions')
	}
	if (!questions.create) {
		throwFieldError('create questions')
	}

	questions.create.map(question => {
		const { choices } = question
		if (!choices) {
			throwFieldError('choices')
		}
		if (!choices.create) {
			throwFieldError('create choices')
		}
	})
}

module.exports = {
	// contants
	APP_SECRET,
	STUDENT,
	TEACHER,

	// errors
	throwPermissionError,
	throwAuthError,
	throwRoleError,
	throwFieldError,

	// validations
	verifyOwner,
	validateId,
	validateExam,

	// actions
	getStudentId(context) {
		const Authorization = context.request.get('Authorization')
		if (Authorization) {
			const token = Authorization.replace('Bearer ', '')
			const { studentId } = jwt.verify(token, APP_SECRET)
			return studentId
		}
		throwAuthError(STUDENT)
	},
	getTeacherId(context) {
		const Authorization = context.request.get('Authorization')
		if (Authorization) {
			const token = Authorization.replace('Bearer ', '')
			const { teacherId } = jwt.verify(token, APP_SECRET)
			return teacherId
		}
		throwAuthError(TEACHER)
	},
	determineRole(studentId, teacherId) {
		if (studentId && !teacherId) {
			return { type: STUDENT, id: studentId }
		} else if (teacherId && !studentId) {
			return { type: TEACHER, id: teacherId }
		} else {
			throwRoleError()
		}
	}
}
