const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { STUDENT, validateId, APP_SECRET, getStudentId, getTeacherId } = require('../utils')

module.exports = {
	// new ones
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
	updateLoggedInStudent(root, args, context, info) {
		const studentId = getStudentId(context)
		validateId(studentId, STUDENT)

		console.log('[!] args.data', args.data.answers.update)

		return context.db.mutation.updateStudent(
			{
				data: args.data,
				where: { id: studentId }
			},
			info
		)
	},
	createExam(root, args, context, info) {
		// only teachers can create an exam
		const teacherId = getTeacherId(context)
		validateId(teacherId)

		const data = { ...args.data, author: { connect: { id: teacherId } } }
		return context.db.mutation.createExam({ data }, info)
	},
	updateExam(root, args, context, info) {
		// only teachers can update their own created exam
		const teacherId = getTeacherId(context)
		validateId(teacherId)

		const exam = context.db.exists.Exam({
			id: args.id,
			author: { id: teacherId }
		})

		if (!exam) {
			throw new Error('Invalid permissions')
		}

		return context.db.mutation.updateExam(
			{
				data: args.data,
				where: args.where
			},
			info
		)
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
