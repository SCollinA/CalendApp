import React from 'react'
import { AppContext } from '../CalendApp'

export const LogoutButton = () => (
    <AppContext.Consumer>
        {({ logout }) => (
            <div className='LogoutButton'
                onClick={logout}
            >
                <p>logout</p>
            </div>
        )}
    </AppContext.Consumer>
)