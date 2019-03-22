import React from 'react'
import { AppContext } from '../CalendApp'
import { LogoutButton } from './LogoutButton'

export const UserForm = () => (
    <AppContext.Consumer>
        {({ user }) => (
            <div className='UserForm'>
                <LogoutButton/>
                <p>user form</p>
            </div>
        )}
    </AppContext.Consumer>
)