import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { BrowserRouter } from 'react-router-dom'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = createHttpLink({
	uri: 'http://localhost:4000'
})

const wsLink = new WebSocketLink({
	uri: `ws://localhost:4000`,
	options: {
		reconnect: true
	}
})

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLink
)

const client = new ApolloClient({
	link,
	clientState: {
		defaults: {
			// to change
			activeItem: 'dashboard'
		},
		resolvers: {
			// to change
			// to add
		},
		typeDefs: {
			// to change
			// to add
		}
	}
})

ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</BrowserRouter>,
	document.getElementById('root')
)
