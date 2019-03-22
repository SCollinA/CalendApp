import React from 'react'
import { AppContext } from '../CalendApp'

export default () => (
    <AppContext.Consumer>
        {({ toggleAbout }) => (
            <div className='AboutButton'
                onClick={toggleAbout}
            >
                <h1>CalendApp</h1>
            </div>
        )}
    </AppContext.Consumer>
)