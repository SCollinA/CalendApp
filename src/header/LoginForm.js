import React from 'react'
import { AppContext } from '../CalendApp'

export default () => (
    <AppContext.Consumer>
        {({ toggleLoginForm }) => (
            <div className='LoginForm'
                onClick={toggleLoginForm}
            >
                <p>login form</p>
            </div>
        )}
    </AppContext.Consumer>
)