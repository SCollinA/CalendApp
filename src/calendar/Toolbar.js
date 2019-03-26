import React from 'react'
import { CalContext } from './Calendar'

export const Toolbar = () => (
    <CalContext.Consumer>
        {({ goToToday }) => (
            <div className='Toolbar'>
                <p onClick={goToToday}>today</p>
            </div>
        )}
    </CalContext.Consumer>
)