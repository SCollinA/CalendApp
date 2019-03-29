import React from 'react'
import { CalContext } from './Calendar'

export const EventForm = ({ event }) => (
    <CalContext.Consumer>
        {({ showEventForm }) => (
            <div className='EventForm'>
                <p>{event.name}</p>
                <p onClick={() => showEventForm()}>
                    close
                </p>
            </div>
        )}
    </CalContext.Consumer>
)