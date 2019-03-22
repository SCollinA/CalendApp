import React from 'react'
import { AppContext } from '../CalendApp'

export const UserButton = () => (
    <AppContext.Consumer>
        {({ user, isLoggedIn, toggleProfile }) => (
            <div className='UserButton'
                onClick={toggleProfile}
            >
                <p>{isLoggedIn ? `welcome, ${user.name}` : 'welcome, guest'}</p>
            </div>
        )}
    </AppContext.Consumer>
)