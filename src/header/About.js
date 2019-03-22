import React from 'react'
import { AppContext } from '../CalendApp'

export const About = () => (
    <AppContext.Consumer>
        {({ toggleAbout }) => (
            <div className='About'>
                <h1 onClick={toggleAbout}>
                    CalendApp
                </h1>
                <p>here's a little about the app</p>
            </div>
        )}
    </AppContext.Consumer>
)