const teacherSubscription = {
  subscribe: (root, args, ctx, info) => {
    return ctx.db.subscription.teacher({}, info)
  }
}
const studentSubscription = {
  subscribe: (root, args, ctx, info) => {
    return ctx.db.subscription.student({}, info)
  }
}

module.exports = {
  teacherSubscription,
  studentSubscription
}
