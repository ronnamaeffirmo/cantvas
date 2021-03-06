import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { BrowserRouter } from 'react-router-dom'
import { ApolloLink, split } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import Routes from './Routes'

const httpLink = createHttpLink({
	uri: 'http://localhost:4000'
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('AUTH_TKN')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
})

const wsLink = new WebSocketLink({
	uri: 'ws://localhost:4000',
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
	authLink.concat(httpLink)
)

const cache = new InMemoryCache()

const client = new ApolloClient({
	link: ApolloLink.from([
		withClientState({
			defaults: {
				activeItemStudent: 'dashboard',
				activeItemTeacher: 'dashboard',
				activeUserTab: 'student',
				dropdownDisable: false
			},
			resolvers: {},
			cache
		}),
		link
	]),
	cache
})

ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<Routes />
		</ApolloProvider>
	</BrowserRouter>,
	document.getElementById('root')
)
