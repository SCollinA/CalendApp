import React from 'react'
import { AppContext } from '../CalendApp'
import { LoginForm } from './LoginForm';
import { UserForm } from './UserForm';
import { LogoutButton } from './LogoutButton';
import { RegisterForm } from './RegisterForm';

export class Profile extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            isRegistering: false
        }
    }

    _toggleRegister = () => this.setState({
        isRegistering: !this.state.isRegistering
    })

    render() {
        const {
            isRegistering,
        } = this.state
        return (
            <AppContext.Consumer>
                {({ isLoggedIn }) => (
                    <div className='Profile'>
                        {isLoggedIn && <LogoutButton/>}
                        {(isLoggedIn && 
                            <UserForm/>) ||
                        (isRegistering &&
                            <RegisterForm showLogin={this._toggleRegister}/>) ||
                            <LoginForm showRegister={this._toggleRegister}/>}
                    </div>
                )}
            </AppContext.Consumer>
        )
    }
}