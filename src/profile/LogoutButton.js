import React from 'react'
import { AppContext } from '../CalendApp'

export const LogoutButton = () => (
    <AppContext.Consumer>
        {({ logout }) => (
            <div className='LogoutButton'
                onClick={logout}
            >
                <p>Login/Logout</p>
            </div>
        )}
    </AppContext.Consumer>
)