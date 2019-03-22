import React from 'react'
import { AppContext } from '../CalendApp'

export const UserButton = () => (
    <AppContext.Consumer>
        {({ toggleUserForm }) => (
            <div className='UserButton'
                onClick={toggleUserForm}
            >
                <p>Welcome, User</p>
            </div>
        )}
    </AppContext.Consumer>
)