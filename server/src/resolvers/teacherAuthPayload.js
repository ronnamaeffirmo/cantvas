module.exports = {
	teacher(root, args, context, info) {
		return context.db.query.teacher({ where: { id: root.teacher.id } }, info)
	}
}
