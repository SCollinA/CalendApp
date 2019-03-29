import React from 'react'
import { CalContext } from './Calendar'

export const EventLabel = ({ event }) => (
    <CalContext.Consumer>
        {({ showEventForm }) => (
            <div className="EventLabel"
                onClick={() => showEventForm(event)}
            >
                <p>{event.name}</p>
            </div>
        )}
    </CalContext.Consumer>
)