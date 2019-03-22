import React from 'react'
import { AppContext } from '../CalendApp'

export const UserButton = () => (
    <AppContext.Consumer>
        {({ user, toggleProfile }) => (
            <div className='UserButton'
                onClick={toggleProfile}
            >
                <p>{user._id ? `Welcome, ${user.name}` : 'Welcome, Guest'}</p>
            </div>
        )}
    </AppContext.Consumer>
)