import React from 'react'
import { AppContext } from '../CalendApp'

export const UserButton = () => (
    <AppContext.Consumer>
        {({ user, isLoggedIn, toggleProfile }) => (
            <div className='UserButton'
                onClick={toggleProfile}
            >
                <p>{isLoggedIn ? `Welcome, ${user.name}` : 'Welcome, Guest'}</p>
            </div>
        )}
    </AppContext.Consumer>
)