const {
	// constants
	STUDENT,
	TEACHER,

	// errors
	throwPermissionError,

	// actions
	getTeacherId,
	getStudentId,
	determineRole,

	// validators
	validateId,
	verifyOwner
} = require('../utils')

module.exports = {
	loggedInStudent(root, args, context, info) {
		const studentId = getStudentId(context)
		validateId(studentId, STUDENT)

		return context.db.query.student({ where: { id: studentId } }, info)
	},
	loggedInTeacher(root, args, context, info) {
		const teacherId = getTeacherId(context)
		validateId(teacherId, TEACHER)

		return context.db.query.teacher({ where: { id: teacherId } }, info)
	},

	// students should only be able to view their own scores
	// teachers are allowed access
	scores(root, args, context, info) {
		const studentId = getStudentId(context)
		const teacherId = getTeacherId(context)
		const role = determineRole(studentId, teacherId)
		const { where } = args

		if (role.type === STUDENT) {
			if (where.student.id) {
				verifyOwner(role.id, where.student.id)
			}
			return context.db.query.scores(
				{
					where: { ...where, student: { id: role.id } }
				},
				info
			)
		} else {
			return context.db.query.scores({ where }, info)
		}
	},

	// only the teacher is allowed access
	students(root, args, context, info) {
		const teacherId = getTeacherId(context)
		validateId(teacherId, TEACHER)

		const { where } = args
		return context.db.query.students({ where }, info)
	},

	// students should only be able to view their own answers
	// teachers are allowed access
	answers(root, args, context, info) {
		const studentId = getStudentId(context)
		const teacherId = getTeacherId(context)
		const role = determineRole(studentId, teacherId)
		const { where } = args

		if (role.type === STUDENT) {
			if (where.student.id) {
				verifyOwner(role.id, where.student.id)
			}
			return context.db.query.answers(
				{
					where: { ...where, student: { id: role.id } }
				},
				info
			)
		} else {
			return context.db.query.answers({ where: where }, info)
		}
	},

	// students can view published exams
	// teacher who created the exam can view his exams
	exams(root, args, context, info) {
		const studentId = getStudentId(context)
		const teacherId = getTeacherId(context)
		const role = determineRole(studentId, teacherId)
		const { where } = args

		if (role.type === STUDENT) {
			if (!where.published) {
				throwPermissionError()
			}
			return context.db.query.exams(
				{
					where: { ...where, published: true }
				},
				info
			)
		} else {
			if (where.author.id) {
				verifyOwner(role.id, where.author.id)
			}
			return context.db.query.exams(
				{
					where: { ...where, author: { id: role.id } }
				},
				info
			)
		}
	},

	// students can view published exam
	// teacher who created the exam can view the exam
	async exam(root, args, context, info) {
		const studentId = getStudentId(context)
		const teacherId = getTeacherId(context)
		const role = determineRole(studentId, teacherId)
		const { where } = args

		if (role.type === STUDENT) {
			if (!where.published) {
				throwPermissionError()
			}
			const exams = await context.db.query.exams(
				{
					where: { ...where, published: true }
				},
				info
			)
			return exams[0]
		} else {
			if (where.author.id) {
				verifyOwner(role.id, where.author.id)
			}
			const exam = context.db.query.exam({ where }, info)
			return exam
		}
	},

	// both student and teacher are allowed access
	subjects(root, args, context, info) {
		const studentId = getStudentId(context)
		const teacherId = getTeacherId(context)
		determineRole(studentId, teacherId)

		const { where } = args
		return context.db.query.subjects({ where }, info)
	}
}
