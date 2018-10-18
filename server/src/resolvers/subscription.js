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
const scoreSubscription = {
	subscribe: (root, args, ctx, info) => {
		return ctx.db.subscription.score({}, info)
	}
}
const subjectSubscription = {
	subscribe: (root, args, ctx, info) => {
		return ctx.db.subscription.subject({}, info)
	}
}
const examSubscription = {
	subscribe: (root, args, ctx, info) => {
		return ctx.db.subscription.exam({}, info)
	}
}
const questionSubscription = {
	subscribe: (root, args, ctx, info) => {
		return ctx.db.subscription.question({}, info)
	}
}
const choiceSubscription = {
	subscribe: (root, args, ctx, info) => {
		return ctx.db.subscription.choice({}, info)
	}
}

module.exports = {
	teacherSubscription,
	studentSubscription,
	scoreSubscription,
	subjectSubscription,
	examSubscription,
	questionSubscription,
	choiceSubscription
}
