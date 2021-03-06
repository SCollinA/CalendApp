import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo/client.js'
import gql from 'graphql-tag'
import './CalendApp.css'
import { Header } from './header/Header.js';
import { Calendar } from './calendar/Calendar.js';
import { About } from './About.js';
import { Profile } from './profile/Profile';

export const AppContext = React.createContext({})

class CalendApp extends Component {
  constructor(props) {
    super(props)

    // declare functions here to pass into state
    // so context is not re-calculated too often
    this.login = user => this.setState({
      user,
      isLoggedIn: true
    })
    
    this.logout = () => this.setState({
      user: {},
      isLoggedIn: false
    }, () => localStorage.removeItem('auth-token'))

    this.goHome = () => this.setState({
      isAboutVisible: false,
      isCalendarVisible: true,
      isProfileVisible: false,
    })

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
  
    // this is passed into context
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
      goHome: this.goHome,
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('auth-token')
    if (token) {
      client.mutate({
        mutation: AUTO_LOGIN,
        variables: {
          token
        }
      })
      .then(({ data: { autoLogin }, loading, error }) => {
        if (autoLogin) {
          localStorage.setItem('auth-token', autoLogin.token)
          this.login(autoLogin.user)
        }
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

export const AUTO_LOGIN = gql`
  mutation AutoLogin($token: String) {
    autoLogin(token: $token) {
      token
      user {
        _id
        name
        eventIds
      }
    }
  }
`

export const GET_USER = gql`
  query GetUser($user: UserInput) {
    getUser(user: $user) {
      _id
      name
      eventIds
    }
  }
`