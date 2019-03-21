import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo/client.js'
import './App.css'

class CalendApp extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="CalendApp">
        <p>hello</p>
        </div>
      </ApolloProvider>
    );
  }
}

export default CalendApp;
