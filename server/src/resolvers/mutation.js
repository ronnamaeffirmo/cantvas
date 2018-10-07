module.exports = {
  createTeacher (root, args, context, info) {
    return context.db.mutation.createTeacher({
      data: args.data
    }, info)
  },
  createStudent (root, args, context, info) {
    return context.db.mutation.createStudent({
      data: args.data
    }, info)
  },
  updateTeacher (root, args, context, info) {
    return context.db.mutation.updateTeacher({
      data: args.data,
      where: args.where
    }, info)
  },
  updateStudent (root, args, context, info) {
    return context.db.mutation.updateStudent({
      data: args.data,
      where: args.where
    }, info)
  },
  deleteTeacher (root, args, context, info) {
    return context.db.mutation.deleteTeacher({
      where: args.where
    })
  },
  deleteStudent (root, args, context, info) {
    return context.db.mutation.deleteStudent({
      where: args.where
    })
  }
}
