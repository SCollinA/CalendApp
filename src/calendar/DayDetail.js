import React from 'react'
import { CalContext } from './Calendar';

export const DayDetail = () => (
    <CalContext.Consumer>
        {({ day }) => (
            <div className='DayDetail'>
                <p>{day.toLocaleString()}</p>
            </div>
        )}
    </CalContext.Consumer>
)