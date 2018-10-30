const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {
	// constants
	STUDENT,
	APP_SECRET,

	// actions
	getStudentId,
	getTeacherId,

	// validators
	validateId,
	verifyOwner,
	validateExam,

	// errors
	throwPermissionError
} = require('../utils')

module.exports = {
	// logged in students can update only their own account
	// this thing has no where on args
	updateLoggedInStudent(root, args, context, info) {
		const studentId = getStudentId(context)
		validateId(studentId, STUDENT)
		return context.db.mutation.updateStudent(
			{
				data: args.data,
				where: { id: studentId }
			},
			info
		)
	},

	// only teachers can create an exam
	// teachers cant create an exam for other teachers
	// teachers cant create exam with incomplete fields
	createExam(root, args, context, info) {
		const teacherId = getTeacherId(context)

		validateId(teacherId)
		validateExam(args.data, teacherId)

		const data = { ...args.data, author: { connect: { id: teacherId } } }
		return context.db.mutation.createExam({ data }, info)
	},

	// only teachers can update their own created exam
	// teachers cant update other teachers exam
	// teachers cant update who the author is
	// this thing only accepts id on where
	async updateExam(root, args, context, info) {
		const { where, data } = args
		const teacherId = getTeacherId(context)
		validateId(teacherId)

		const exam = await context.db.query.exam({ where: { id: where.id } }, '{ author { id } }')
		verifyOwner(teacherId, exam.author.id)

		if (data && data.author) {
			throwPermissionError()
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
	},

	// auth - signin
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
	}
}
