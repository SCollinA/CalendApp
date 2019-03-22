import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo/client.js'
import './CalendApp.css'
import { Header } from './header/Header.js';
import { Calendar } from './calendar/Calendar.js';
import { About } from './About.js';
import { Profile } from './profile/Profile';
import { LOGIN } from './profile/LoginForm.js';

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
    const name = localStorage.getItem('user-name')
    if (token && name) { 
      client.query({
        query: LOGIN,
        variables: {
          token,
          user: {
            name: name
          },
        }
      })
      .then(({ data: { login: { user } }, loading, error }) => {
        this.login(user) 
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