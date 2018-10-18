module.exports = {
	createTeacher(root, args, context, info) {
		return context.db.mutation.createTeacher(
			{
				data: args.data
			},
			info
		)
	},
	createStudent(root, args, context, info) {
		return context.db.mutation.createStudent(
			{
				data: args.data
			},
			info
		)
	},
	createScore(root, args, context, info) {
		return context.db.mutation.createScore(
			{
				data: args.data
			},
			info
		)
	},
	createSubject(root, args, context, info) {
		return context.db.mutation.createSubject(
			{
				data: args.data
			},
			info
		)
	},
	createExam(root, args, context, info) {
		return context.db.mutation.createExam(
			{
				data: args.data
			},
			info
		)
	},
	createQuestion(root, args, context, info) {
		return context.db.mutation.createQuestion(
			{
				data: args.data
			},
			info
		)
	},
	createChoice(root, args, context, info) {
		return context.db.mutation.createChoice(
			{
				data: args.data
			},
			info
		)
	},
	updateTeacher(root, args, context, info) {
		return context.db.mutation.updateTeacher(
			{
				data: args.data,
				where: args.where
			},
			info
		)
	},
	updateStudent(root, args, context, info) {
		return context.db.mutation.updateStudent(
			{
				data: args.data,
				where: args.where
			},
			info
		)
	},
	updateScore(root, args, context, info) {
		return context.db.mutation.updateScore(
			{
				data: args.data,
				where: args.where
			},
			info
		)
	},
	updateSubject(root, args, context, info) {
		return context.db.mutation.updateSubject(
			{
				data: args.data,
				where: args.where
			},
			info
		)
	},
	updateExam(root, args, context, info) {
		return context.db.mutation.updateExam(
			{
				data: args.data,
				where: args.where
			},
			info
		)
	},
	updateQuestion(root, args, context, info) {
		return context.db.mutation.updateQuestion(
			{
				data: args.data,
				where: args.where
			},
			info
		)
	},
	updateChoice(root, args, context, info) {
		return context.db.mutation.updateChoice(
			{
				data: args.data,
				where: args.where
			},
			info
		)
	},
	deleteTeacher(root, args, context, info) {
		return context.db.mutation.deleteTeacher({
			where: args.where
		})
	},
	deleteStudent(root, args, context, info) {
		return context.db.mutation.deleteStudent({
			where: args.where
		})
	},
	deleteScore(root, args, context, info) {
		return context.db.mutation.deleteScore({
			where: args.where
		})
	},
	deleteSubject(root, args, context, info) {
		return context.db.mutation.deleteSubject({
			where: args.where
		})
	},
	deleteExam(root, args, context, info) {
		return context.db.mutation.deleteExam({
			where: args.where
		})
	},
	deleteQuestion(root, args, context, info) {
		return context.db.mutation.deleteQuestion({
			where: args.where
		})
	},
	deleteChoice(root, args, context, info) {
		return context.db.mutation.deleteChoice({
			where: args.where
		})
	}
}
