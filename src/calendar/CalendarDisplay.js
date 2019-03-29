import React from 'react'
import { CalContext } from './Calendar'
import { DayDetail } from './DayDetail'

export const CalendarDisplay = React.forwardRef(({ children }, ref) => (
    <CalContext.Consumer>
        {({ scrollWeeks, day }) => (
            <div className='CalendarDisplay' 
                ref={ref}
                onScroll={scrollWeeks}
            >
                {children}
                {day && <DayDetail/>}
            </div>
        )}
    </CalContext.Consumer>
))