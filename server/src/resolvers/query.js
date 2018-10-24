const { getTeacherId, getStudentId } = require('../utils')

module.exports = {
	// new ones
	loggedInStudent(root, args, context, info) {
		const studentId = getStudentId(context)
		return context.db.query.student({ where: { id: studentId } }, info)
	},
	loggedInTeacher(root, args, context, info) {
		const teacherId = getTeacherId(context)
		return context.db.query.teacher({ where: { id: teacherId } }, info)
	},
	exams(root, args, context, info) {
		// both student and teacher are allowed to access
		const getUserId = args.type === 'student' ? getStudentId : getTeacherId
		getUserId(context)

		const { where } = args
		return context.db.query.exams({ where }, info)
	},

	// old ones
	teachers(root, args, context, info) {
		getTeacherId(context)

		const { where } = args
		return context.db.query.teachers({ where }, info)
	},
	students(root, args, context, info) {
		getStudentId(context)

		const { where } = args
		return context.db.query.students({ where }, info)
	},
	scores(root, args, context, info) {
		const { where } = args
		return context.db.query.scores({ where }, info)
	},
	subjects(root, args, context, info) {
		const { where } = args
		return context.db.query.subjects({ where }, info)
	},
	answers(root, args, context, info) {
		const { where } = args
		return context.db.query.answers({ where }, info)
	},
	questions(root, args, context, info) {
		const { where } = args
		return context.db.query.questions({ where }, info)
	},
	choices(root, args, context, info) {
		const { where } = args
		return context.db.query.choices({ where }, info)
	},
	teacher(root, args, context, info) {
		const { where } = args
		return context.db.query.teacher({ where }, info)
	},
	student(root, args, context, info) {
		const { where } = args
		return context.db.query.student({ where }, info)
	},
	score(root, args, context, info) {
		const { where } = args
		return context.db.query.score({ where }, info)
	},
	subject(root, args, context, info) {
		const { where } = args
		return context.db.query.subject({ where }, info)
	},
	exam(root, args, context, info) {
		const { where } = args
		return context.db.query.exam({ where }, info)
	},
	question(root, args, context, info) {
		const { where } = args
		return context.db.query.question({ where }, info)
	},
	choice(root, args, context, info) {
		const { where } = args
		return context.db.query.choice({ where }, info)
	},
	answer(root, args, context, info) {
		const { where } = args
		return context.db.query.answer({ where }, info)
	}
}
