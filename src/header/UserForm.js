import React from 'react'
import { AppContext } from '../CalendApp'

export default () => (
    <AppContext.Consumer>
        {({ toggleUserForm }) => (
            <div className='UserForm'
                onClick={toggleUserForm}
            >
                <p>component</p>
            </div>
        )}
    </AppContext.Consumer>
)