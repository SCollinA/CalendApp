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
                                    let freeTimeEnd = null
                                    if (index !== getEvents.length - 1) {
                                        if (event.timeEnd < getEvents[index + 1].timeStart) {
                                            freeTimeEnd = getEvents[index + 1].timeStart
                                        }
                                    } else {
                                        const midnightTonight = new Date(event.timeStart)
                                        midnightTonight.setHours(23, 59, 59, 0)
                                        midnightTonight.setDate(midnightTonight.getDate() + 1)
                                        if (event.timeEnd < midnightTonight) {
                                            freeTimeEnd = midnightTonight
                                        }
                                    }
                                    return (
                                        <div key={index}>
                                            <EventLabel event={event}/>
                                            {freeTimeEnd &&
                                                <EventAddButton timeStart={event.timeEnd || freeTimeEnd}
                                                    timeEnd={freeTimeEnd}
                                                />}
                                        </div>
                                    )
                                })}
                                {!getEvents.length && 
                                    <EventAddButton timeStart={day}
                                        timeEnd={day}
                                    />}
                                <p onClick={() => showDayDetail()}>close</p>
                            </div>
                        )}    
                    </Query>
                )}
            </CalContext.Consumer>
        )}
    </AppContext.Consumer>
)