import React from 'react'
import { AppContext } from '../CalendApp'

export const UserButton = () => (
    <AppContext.Consumer>
        {({ user, toggleUserForm }) => (
            <div className='UserButton'
                onClick={toggleUserForm}
            >
                <p>{user._id ? `Welcome, ${user.name}` : 'Welcome, Guest'}</p>
            </div>
        )}
    </AppContext.Consumer>
)