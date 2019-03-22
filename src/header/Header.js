import React from 'react'
import About from './About';
import AboutButton from './AboutButton'
import UserForm from './UserForm';
import UserButton from './UserButton'
import LoginForm from './LoginForm';
import LoginButton from './LoginButton'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAboutVisible: false,
            isUserFormVisible: false,
            isLoginFormVisible: false,
        }
    }

    _toggleAbout = () => this.setState({
        isAboutVisible: !this.state.isAboutVisible
    })
   
    _toggleUserForm = () => this.setState({
        isUserFormVisible: !this.state.isUserFormVisible
    })
   
    _toggleLoginForm = () => this.setState({
        isLoginVisible: !this.state.isLoginFormVisible
    })

    render() {
        const {
            isAboutVisible,
            isUserFormVisible,
            isLoginFormVisible
        } = this.state
        return (
            <div className='Header'>
                {(isAboutVisible &&
                    <About
                        hideAbout={this._toggleAbout}
                    />) ||
                    <AboutButton
                        showAbout={this._toggleAbout}
                    />}
                {(isUserFormVisible &&
                    <UserForm
                        hideUserForm={this._toggleUserForm}
                    />) ||
                    <UserButton
                        showUserForm={this._toggleUserForm}
                    />}
                {(isLoginFormVisible &&
                    <LoginForm
                        hideLoginForm={this._toggleLoginForm}
                    />) ||
                    <LoginButton
                        showLoginForm={this._toggleLoginForm}
                    />}
            </div>
        )
    }
}