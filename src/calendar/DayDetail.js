import React from 'react'
import { Query } from 'react-apollo'
import { CalContext } from './Calendar'
import { GET_EVENTS } from './Week'
import { AppContext } from '../CalendApp'
import { Loading } from '../Loading'
import { EventLabel } from './EventLabel'
import { EventAddButton } from './EventAddButton'

export const DayDetail = () => (
    <AppContext.Consumer>
        {({ user }) => (
            <CalContext.Consumer>
                {({ day, showDayDetail }) => (
                    <Query query={GET_EVENTS}
                        variables={{
                            event: {
                                hostId: user._id,
                                timeStart: day.toDateString()
                            }
                        }}
                        fetchPolicy='cache-only'
                    >
                        {({ data: { getEvents }, loading, error }) => (
                            <div className='DayDetail'>
                                {(loading &&
                                    <Loading/>)}
                                <p>{day.toDateString()}</p>
                                {getEvents.map((event, index, arr) => {
                                    let freeTime = false
                                    if (index !== getEvents.length - 1) {
                                        if (event.timeEnd < getEvents[index + 1].timeEnd) {
                                            freeTime = true
                                        }
                                    } else {
                                        const midnightTonight = new Date()
                                        midnightTonight.setHours(0, 0, 0, 0)
                                        midnightTonight.setDate(midnightTonight.getDate() + 1)
                                        if (event.timeEnd < midnightTonight) {
                                            freeTime = true
                                        }
                                    }
                                    return (
                                        <div key={index}>
                                            <EventLabel  event={event}/>
                                            {freeTime &&
                                                <EventAddButton timeStart={event.timeEnd}/>}
                                        </div>
                                    )
                                })}
                                {!getEvents.length && 
                                    <EventAddButton/>}
                                <p onClick={() => showDayDetail()}>close</p>
                            </div>
                        )}    
                    </Query>
                )}
            </CalContext.Consumer>
        )}
    </AppContext.Consumer>
)