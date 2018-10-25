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
		const getUserId = args.type === 'student' ? getStudentId : getTeacherId
		const id = getUserId(context)
		validateId(id)

		const { where } = args
		return context.db.query.students({ where }, info)
	},
	answers(root, args, context, info) {
		// students should only be able to view their own answers
		// teachers are allowed access
		console.log('[!] args', args)
		const { where } = args
		const role = determineRole(getStudentId(context), getTeacherId(context))

		if (role.type === STUDENT) {
			return context.db.query.answers({ ...where, student: { id: role.id } }, info)
		} else {
			return context.db.query.answers({ where: where }, info)
		}
	},
	exams(root, args, context, info) {
		// students can view published exams, that includes in their subjects
		// teacher who created the exam can view his exams
		const { where: initialWhere } = args
		const role = determineRole(getStudentId(context), getTeacherId(context))

		if (role.type === STUDENT) {
			const where = { ...initialWhere, published: true }
			return context.db.query.exams({ where }, info)
		} else {
			const where = { ...initialWhere, author: { id: role.id } }
			return context.db.query.exams({ where }, info)
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
		const getUserId = args.type === 'student' ? getStudentId : getTeacherId
		const id = getUserId(context)
		validateId(id)

		const { where } = args
		return context.db.query.subjects({ where }, info)
	}
}
