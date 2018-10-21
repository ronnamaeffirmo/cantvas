const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')

module.exports = {
	async createTeacher(root, args, context, info) {
		const password = await bcrypt.hash(args.data.password, 10)
		const teacher = await context.db.mutation.createTeacher({
			data: { ...args.data, password }
		})
		return {
			token: jwt.sign({ teacherId: teacher.id }, APP_SECRET),
			teacher
		}
	},
	async createStudent(root, args, context, info) {
		const password = await bcrypt.hash(args.data.password, 10)
		const student = await context.db.mutation.createStudent({
			data: { ...args.data, password }
		})
		return {
			token: jwt.sign({ studentId: student.id }, APP_SECRET),
			student
		}
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
	},

	// auth - login
	async studentLogin(root, args, context, info) {
		const student = await context.db.query.student(
			{ where: { email: args.email } },
			'{ id password }'
		)
		if (!student) throw new Error('No such student found')

		const valid = await bcrypt.compare(args.password, student.password)
		if (!valid) throw new Error('Invalid student password')

		const token = jwt.sign({ studentId: student.id }, APP_SECRET)
		return { token, student }
	},
	async teacherLogin(root, args, context, info) {
		const teacher = await context.db.query.teacher(
			{ where: { email: args.email } },
			'{ id password }'
		)
		if (!teacher) throw new Error('No such teacher found')

		const valid = await bcrypt.compare(args.password, teacher.password)
		if (!valid) throw new Error('Invalid teacher password')

		const token = jwt.sign({ teacherId: teacher.id }, APP_SECRET)
		return { token, teacher }
	}
}
