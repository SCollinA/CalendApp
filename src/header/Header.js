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
                    <UserForm/>) ||
                    <UserButton
                        showUserForm={() => this.setState({
                            isUserFormVisible: !this.state.isUserFormVisible
                        })}
                    />}
                {(isLoginFormVisible &&
                    <LoginForm/>) ||
                    <LoginButton
                        showLoginForm={() => this.setState({
                            isLoginFormVisible: !this.state.isLoginFormVisible
                        })}
                    />}
            </div>
        )
    }
}