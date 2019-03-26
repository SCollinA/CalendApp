import React from 'react'
import { AppContext } from '../CalendApp'

export const HomeButton = () => (
    <AppContext.Consumer>
        {({ goHome }) => (
            <div className='HomeButton'
                onClick={goHome}
            >
                <h1>calendapp</h1>
            </div>
        )}
    </AppContext.Consumer>
)