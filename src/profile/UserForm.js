import React from 'react'
import { AppContext } from '../CalendApp'

export const UserForm = () => (
    <AppContext.Consumer>
        {({ user }) => (
            <div className='UserForm'>
                <p>user form</p>
            </div>
        )}
    </AppContext.Consumer>
)