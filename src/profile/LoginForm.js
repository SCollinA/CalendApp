import React from 'react'
import { AppContext } from '../CalendApp'

export const LoginForm = () => (
    <AppContext.Consumer>
        {({ login }) => (
            <div className='LoginForm'>
                <p>login form</p>
            </div>
        )}
    </AppContext.Consumer>
)