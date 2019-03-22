import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo/client.js'
import './CalendApp.css'
import { Header } from './header/Header.js';
import { Calendar } from './calendar/Calendar.js';

export const AppContext = React.createContext({})

class CalendApp extends Component {
  constructor(props) {
    super(props)
    
    this.toggleAbout = () => this.setState({
      isAboutVisible: !this.state.isAboutVisible,
      isCalendarVisible: !this.state.isCalendarVisible
    })
  
    this.toggleUserForm = () => this.setState({
      isUserFormVisible: !this.state.isUserFormVisible,
      isCalendarVisible: !this.state.isCalendarVisible
    })
  
    this.toggleLoginForm = () => this.setState({
      isLoginVisible: !this.state.isLoginFormVisible,
      isCalendarVisible: !this.state.isCalendarVisible
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
    const { isCalendarVisible } = this.state
    return (
      <ApolloProvider client={client}>
        <AppContext.Provider
          value={this.state}
        >
          <div className="CalendApp">
            <Header/>
            {isCalendarVisible &&
              <Calendar/>}
          </div>
        </AppContext.Provider>
      </ApolloProvider>
    )
  }
}

export default CalendApp;
