import React from 'react'
import { AppContext } from '../CalendApp'
import { LoginForm } from './LoginForm';
import { UserForm } from './UserForm';

export const Profile = () => (
    <AppContext.Consumer>
        {({ isLoggedIn }) => (
            <div className='Profile'>
                {(!isLoggedIn && 
                    <LoginForm/>) ||
                    <UserForm/>}
            </div>
        )}
    </AppContext.Consumer>
)