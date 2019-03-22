import React from 'react'
import { AppContext } from '../CalendApp'
import { LoginForm } from './LoginForm';

export const UserForm = () => (
    <AppContext.Consumer>
        {({ user, isLoggedIn }) => (
            <div className='UserForm'>
                {(!isLoggedIn &&
                    <LoginForm/>) ||
                <p>user form</p>}
            </div>
        )}
    </AppContext.Consumer>
)