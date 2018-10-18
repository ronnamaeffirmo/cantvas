module.exports = {
	teachers(root, args, context, info) {
		return context.db.query.teachers({}, info)
	},
	students(root, args, context, info) {
		return context.db.query.students({}, info)
	},
	scores(root, args, context, info) {
		return context.db.query.scores({}, info)
	},
	subjects(root, args, context, info) {
		return context.db.query.subjects({}, info)
	},
	exams(root, args, context, info) {
		return context.db.query.exams({}, info)
	},
	questions(root, args, context, info) {
		return context.db.query.questions({}, info)
	},
	choices(root, args, context, info) {
		return context.db.query.choices({}, info)
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
	}
}
