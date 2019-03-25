import React from 'react'
import { CalContext } from './Calendar'

export const CalendarDisplay = React.forwardRef(({ children }, ref) => (
    <CalContext.Consumer>
        {({ scrollWeeks, }) => (
            <div className='CalendarDisplay' 
                ref={ref}
                onScroll={scrollWeeks}
            >
                {children}
            </div>
        )}
    </CalContext.Consumer>
))