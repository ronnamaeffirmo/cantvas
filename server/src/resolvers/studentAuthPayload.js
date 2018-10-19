module.exports = {
	student(root, args, context, info) {
		return context.db.query.student({ where: { id: root.student.id } }, info)
	}
}
