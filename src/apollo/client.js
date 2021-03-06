import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-fetch'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

// Create a WebSocket link:
const wsLink = process.browser ? new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    // the below would be used to have authenticated subscriptions
    // connectionParams: {
    //   authToken: localStorage.getItem('auth-token')
    // }
  },
}) : null

const link = process.browser ? split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink, // comes here if above callback returns true
  httpLink,
) : httpLink

export const client = new ApolloClient({
  fetch,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    setContext((_, { headers }) =>{ 
      const token = localStorage.getItem('auth-token')
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    }),
    link
  ]),
  cache: new InMemoryCache()
})