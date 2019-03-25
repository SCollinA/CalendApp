import React from 'react'
import { Week } from './Week'
import { CalContext } from './Calendar'

export const CalendarDisplay = () => (
    <CalContext.Consumer>
        {({ weeks }) => (
            <div className='CalendarDisplay'>
                {weeks.map((week, index) => (
                    <Week key={index} week={week}/>
                ))}
            </div>
        )}
    </CalContext.Consumer>
)