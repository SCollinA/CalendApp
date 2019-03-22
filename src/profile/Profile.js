import React from 'react'
import { AppContext } from '../CalendApp'
import { LoginForm } from './LoginForm';
import { UserForm } from './UserForm';
import { LogoutButton } from './LogoutButton';

export const Profile = () => (
    <AppContext.Consumer>
        {({ isLoggedIn }) => (
            <div className='Profile'>
                {isLoggedIn && <LogoutButton/>}
                {(!isLoggedIn && 
                    <LoginForm/>) ||
                    <UserForm/>}
            </div>
        )}
    </AppContext.Consumer>
)