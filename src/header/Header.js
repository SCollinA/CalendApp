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
    render() {
        const {
            isAboutVisible,
            isUserFormVisible,
            isLoginFormVisible
        } = this.state
        return (
            <div className='Header'>
                {(isAboutVisible &&
                    <About/>) ||
                    <AboutButton/>}
                {(isUserFormVisible &&
                    <UserForm/>) ||
                    <UserButton/>}
                {(isLoginFormVisible &&
                    <LoginForm/>) ||
                    <LoginButton/>}
            </div>
        )
    }
}