import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { client } from './apollo/client.js'
import './CalendApp.css'
import { Header } from './header/Header.js';
import { Calendar } from './calendar/Calendar.js';
import { About } from './About.js';
import { Profile } from './profile/Profile';

export const AppContext = React.createContext({})

class CalendApp extends Component {
  constructor(props) {
    super(props)

    this.login = user => this.setState({
      user,
      isLoggedIn: true
    })
    
    this.logout = () => this.setState({
      user: {},
      isLoggedIn: false
    }, () => localStorage.removeItem('auth-token'))

    this.toggleAbout = () => this.setState({
      isAboutVisible: !this.state.isAboutVisible,
      isCalendarVisible: this.state.isAboutVisible,
      isProfileVisible: false,
    })
  
    this.toggleProfile = () => this.setState({
      isProfileVisible: !this.state.isProfileVisible,
      isCalendarVisible: this.state.isProfileVisible,
      isAboutVisible: false,
    })
  
    this.state = {
      user: {},
      isLoggedIn: false,
      login: this.login,
      logout: this.logout,
      isAboutVisible: false,
      isProfileVisible: false,
      isCalendarVisible: true,
      toggleAbout: this.toggleAbout,
      toggleProfile: this.toggleProfile,
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('auth-token')
    const _id = localStorage.getItem('user-id')
    if (token && _id) { 
      client.query({
        query: GET_USER,
        variables: {
          user: {
            _id
          },
        }
      })
      .then(({ data: { getUser }, loading, error }) => {
        this.login(getUser) 
      })
    }
  }

  render() {
    const { 
      isCalendarVisible,
      isAboutVisible,
      isProfileVisible,
     } = this.state
    return (
      <ApolloProvider client={client}>
        <AppContext.Provider
          value={this.state}
        >
          <div className="CalendApp">
            <Header/>
            {isCalendarVisible &&
              <Calendar/>}
            {isAboutVisible && 
              <About/>}
            {isProfileVisible &&
              <Profile/>}
          </div>
        </AppContext.Provider>
      </ApolloProvider>
    )
  }
}

export default CalendApp;

const GET_USER = gql`
query GetUser($user: UserInput) {
  getUser(user: $user) {
    _id
    name
    eventIds
  }  
}
`