import React from 'react'
import { AppContext } from '../CalendApp'

export const UserForm = () => (
    <AppContext.Consumer>
        {({ toggleUserForm }) => (
            <div className='UserForm'
                onClick={toggleUserForm}
            >
                <p>user form</p>
            </div>
        )}
    </AppContext.Consumer>
)