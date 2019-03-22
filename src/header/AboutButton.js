import React from 'react'
import { AppContext } from '../CalendApp'

export const AboutButton = () => (
    <AppContext.Consumer>
        {({ toggleAbout }) => (
            <div className='AboutButton'
                onClick={toggleAbout}
            >
                <h1>calendapp</h1>
            </div>
        )}
    </AppContext.Consumer>
)