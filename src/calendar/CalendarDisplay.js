import React from 'react'
import { CalContext } from './Calendar'
import { DayDetail } from './DayDetail'
import { EventForm } from './EventForm';

export const CalendarDisplay = React.forwardRef(({ children }, ref) => (
    <CalContext.Consumer>
        {({ scrollWeeks, day, event }) => (
            <div className='CalendarDisplay' 
                ref={ref}
                onScroll={scrollWeeks}
            >
                {children}
                {day && <DayDetail/>}
                {event && <EventForm event={event}/>}
            </div>
        )}
    </CalContext.Consumer>
))