import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo/client.js'
import './CalendApp.css'
import { Header } from './header/Header.js';
import { Calendar } from './calendar/Calendar.js';
import { About } from './header/About.js';
import { UserForm } from './header/UserForm.js';
import { LoginForm } from './header/LoginForm.js';

export const AppContext = React.createContext({})

class CalendApp extends Component {
  constructor(props) {
    super(props)
    
    this.toggleAbout = () => this.setState({
      isAboutVisible: !this.state.isAboutVisible,
      isCalendarVisible: this.state.isAboutVisible,
      isUserFormVisible: false,
      isLoginFormVisible: false,
    })
  
    this.toggleUserForm = () => this.setState({
      isUserFormVisible: !this.state.isUserFormVisible,
      isCalendarVisible: this.state.isUserFormVisible,
      isAboutVisible: false,
      isLoginFormVisible: false,
    })
  
    this.toggleLoginForm = () => this.setState({
      isLoginFormVisible: !this.state.isLoginFormVisible,
      isCalendarVisible: this.state.isLoginFormVisible,
      isAboutVisible: false,
      isUserFormVisible: false,
    })

    this.state = {
      user: {},
      isAboutVisible: false,
      isUserFormVisible: false,
      isLoginFormVisible: false,
      isCalendarVisible: true,
      toggleAbout: this.toggleAbout,
      toggleUserForm: this.toggleUserForm,
      toggleLoginForm: this.toggleLoginForm,
    }
  }



  render() {
    const { 
      isCalendarVisible,
      isAboutVisible,
      isUserFormVisible,
      isLoginFormVisible,
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
            {isUserFormVisible &&
              <UserForm/>}
            {isLoginFormVisible &&
              <LoginForm/>}
          </div>
        </AppContext.Provider>
      </ApolloProvider>
    )
  }
}

export default CalendApp;
