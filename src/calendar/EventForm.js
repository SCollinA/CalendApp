import React from 'react'
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag'
import { AppContext } from '../CalendApp'
import { CalContext } from './Calendar'
import { GET_EVENTS } from './Week'

export const EventForm = ({ event }) => (
    <AppContext.Consumer>
        {({ user }) => (
    <CalContext.Consumer>
        {({ day, showEventForm, newEvent, updateEventForm }) => (
            <Query query={GET_EVENT}
                variables={{ 
                    event: {
                        _id: event._id
                    }
                }}
            >
                {({ data: { getEvent }, loading, error }) => {
                    const getEventLoading = loading
                    return (
                    <Mutation mutation={UPDATE_EVENT}
                        update={(cache, { data: { updateEvent }, loading, error }) => {
                            const { getEvents } = cache.readQuery({
                                query: GET_EVENTS,
                                variables: {
                                    event: {
                                        hostId: getEvent.hostId,
                                        timeStart: day.toDateString()
                                    }
                                }
                            })
                            cache.writeQuery({
                                query: GET_EVENTS,
                                variables: {
                                    event: {
                                        hostId: event.hostId,
                                        timeStart: day.toDateString()
                                    }
                                },
                                data: {
                                    getEvents: [
                                        ...getEvents,
                                        updateEvent
                                    ]
                                }
                            })
                        }}
                        onCompleted={(data) => showEventForm()}
                    >
                        {(updateEvent, { data, loading, error }) => (
                            <form className='EventForm'
                                onSubmit={e => {
                                    e.preventDefault()
                                    delete event.__typename
                                    delete newEvent.__typename
                                    updateEvent({
                                        variables: {
                                            oldEvent: event,
                                            newEvent
                                        }
                                    })
                                }}
                                onReset={() => showEventForm(event)}
                            >
                                {!getEventLoading && (
                                <>
                                    <input 
                                        type='text' 
                                        name='name' 
                                        value={newEvent.name}
                                        onChange={({ target: { value }}) => updateEventForm({
                                            ...newEvent,
                                            name: value
                                        })}
                                    />
                                    <Query query={GET_EVENTS}
                                        variables={{
                                            hostId: user._id,
                                            timeStart: day.toDateString()
                                        }}
                                        fetchPolicy={'cache-only'}
                                    >
                                        {({ data: { getEvents }, loading, error }) => {
                                            var timeEndMax
                                            var timeStartMax 
                                            for (let i = 0; getEvents && i < getEvents.length; i++) {
                                                const getEvent = getEvents[i]
                                                // if it's the first event of the day
                                                if (i === 0 && getEvent._id === event._id) {
                                                    // make the start time max midnight that morning
                                                    timeStartMax = new Date(day).toDateString()
                                                } else if (new Date(getEvent.timeEnd) < new Date(event.timeStart)) {
                                                    timeStartMax = getEvent.timeEnd
                                                } else {
                                                    // this must be the event itself
                                                    // if this is the last event today
                                                    if (i === getEvents.length - 1) {
                                                        // time end max is midnight tonight
                                                        const midnightTonight = new Date(event.timeStart)
                                                        midnightTonight.setHours(23, 59, 59, 9999)
                                                        timeEndMax = midnightTonight.toDateString()
                                                    } else {
                                                        // else it is the timeStart of the next event
                                                        timeEndMax = getEvents[i + 1].timeStart
                                                        break
                                                    }
                                                }
                                            }
                                            console.log(timeEndMax, timeStartMax)
                                            return (
                                                <>
                                                    <p>{new Date(newEvent.timeStart).toLocaleTimeString()}</p> 
                                                    <select name='timeStart'>

                                                    </select>
                                                    <p>{new Date(newEvent.timeEnd).toLocaleTimeString()}</p> 
                                                    <select name='timeEnd'>

                                                    </select>
                                                </>
                                            )
                                        }}
                                    </Query>
                                    {/* start time input */}
                                    {/* end time input */}
                                    {getEvent.guestIds.map(guestId => (
                                        <p>{guestId}</p>
                                    ))}
                                    <input type='button' value='cancel'
                                        onClick={() => showEventForm()}
                                    />
                                    <input type='reset' value='reset'/>
                                    <input type='submit' value='submit'/>
                                </>
                                )}
                            </form>
                        )}
                    </Mutation>                  
                )}}
            </Query>
        )}
    </CalContext.Consumer>  
        )}
    </AppContext.Consumer>
)

export const GET_EVENT = gql`
  query GetEvent($event: EventInput) {
      getEvent(event: $event) {
          _id
          hostId
          name
          timeStart
          timeEnd
          guestIds
          notes
      }
  }
`

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($oldEvent: EventInput, $newEvent: EventInput) {
      updateEvent(oldEvent: $oldEvent, newEvent: $newEvent) {
          _id
          name
          timeStart
          timeEnd
          notes
      }
  }
`