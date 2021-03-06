const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')
const Subscription = require('./resolvers/subscription')
const StudentAuthPayload = require('./resolvers/studentAuthPayload')
const TeacherAuthPayload = require('./resolvers/teacherAuthPayload')

const resolvers = {
	Query,
	Mutation,
	Subscription,
	StudentAuthPayload,
	TeacherAuthPayload
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: req => ({
		...req,
		db: new Prisma({
			typeDefs: 'src/generated/prisma.graphql',
			endpoint: 'https://us1.prisma.sh/mark-jardenil/finals_softArch/dev',
			secret: 'ronmark',
			debug: true
		})
	})
})

server.start(() => console.log('Server is running on http://localhost:4000'))
