const {
	STUDENT,
	TEACHER,
	getTeacherId,
	getStudentId,
	validateId,
	verifyOwner,
	determineRole
} = require('../utils')

module.exports = {
	// new ones
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
	scores(root, args, context, info) {
		// students should only be able to view their own scores
		// teachers are allowed access
		const role = determineRole(getStudentId(context), getTeacherId(context))

		if (role.type === STUDENT) {
			return context.db.query.scores({ where: { id: role.id } }, info)
		} else {
			const { where } = args
			return context.db.query.scores({ where }, info)
		}
	},
	students(root, args, context, info) {
		// both student and teacher are allowed access
		determineRole(getStudentId(context), getTeacherId(context))

		const { where } = args
		return context.db.query.students({ where }, info)
	},
	answers(root, args, context, info) {
		// students should only be able to view their own answers
		// teachers are allowed access
		const { where } = args
		const role = determineRole(getStudentId(context), getTeacherId(context))

		if (role.type === STUDENT) {
			return context.db.query.answers({ where: { ...where, student: { id: role.id } } }, info)
		} else {
			return context.db.query.answers({ where: where }, info)
		}
	},
	exams(root, args, context, info) {
		// students can view published exams
		// teacher who created the exam can view his exams
		const { where } = args
		const role = determineRole(getStudentId(context), getTeacherId(context))

		if (role.type === STUDENT) {
			return context.db.query.exams({ where: { ...where, published: true } }, info)
		} else {
			return context.db.query.exams({ where: { ...where, author: { id: role.id } } }, info)
		}
	},
	async exam(root, args, context, info) {
		// students can view published exam
		// teacher who created the exam can view the exam
		const { where } = args
		const role = determineRole(getStudentId(context), getTeacherId(context))

		if (role.type === STUDENT) {
			const exams = await context.db.query.exams({ where: { ...where, published: true } }, info)
			return exams[0]
		} else {
			const exam = context.db.query.exam({ where }, info)
			verifyOwner(role.id, exam.author.id)

			return exam
		}
	},
	subjects(root, args, context, info) {
		// both student and teacher are allowed access
		determineRole(getStudentId(context), getTeacherId(context))

		const { where } = args
		return context.db.query.subjects({ where }, info)
	}
}
