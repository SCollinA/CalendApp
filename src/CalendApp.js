import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo/client.js'
import './CalendApp.css'
import { Header } from './header/Header.js';
import { Calendar } from './calendar/Calendar.js';
import { About } from './About.js';
import { UserForm } from './profile/UserForm.js';

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
    })

    this.toggleAbout = () => this.setState({
      isAboutVisible: !this.state.isAboutVisible,
      isCalendarVisible: this.state.isAboutVisible,
      isProfileVisible: false,
      isLoginFormVisible: false,
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
              <UserForm/>}
          </div>
        </AppContext.Provider>
      </ApolloProvider>
    )
  }
}

export default CalendApp;
