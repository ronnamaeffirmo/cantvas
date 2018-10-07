module.exports = {
  teachers (root, args, context, info) {
    return context.db.query.teachers({}, info)
  },
  students (root, args, context, info) {
    return context.db.query.students({}, info)
  },
  teacher (root, args, context, info) {
    const { where } = args
    return context.db.query.teacher({ where }, info)
  },
  student (root, args, context, info) {
    const { where } = args
    return context.db.query.student({ where }, info)
  }
}
