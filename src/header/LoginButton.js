import React from 'react'
import { AppContext } from '../CalendApp'

export const LoginButton = () => (
    <AppContext.Consumer>
        {({ toggleLoginForm }) => (
            <div className='LoginButton'
                onClick={toggleLoginForm}
            >
                <p>Login/Logout</p>
            </div>
        )}
    </AppContext.Consumer>
)