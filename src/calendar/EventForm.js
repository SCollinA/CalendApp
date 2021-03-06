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
                                            event: {
                                                hostId: user._id,
                                                timeStart: day.toDateString()
                                            }
                                        }}
                                        fetchPolicy={'cache-only'}
                                    >
                                        {({ data: { getEvents }, loading, error }) => {
                                            const midnightTonight = new Date(event.timeStart)
                                            midnightTonight.setHours(23, 59, 59, 0)
                                            var timeEndMax = midnightTonight
                                            var timeStartMax = new Date(day)
                                            for (let i = 0; i < getEvents.length; i++) {
                                                const getEvent = getEvents[i]
                                                // if it's the first event of the day (the getEvent)
                                                if (getEvent.timeEnd < event.timeStart) {
                                                    timeStartMax = new Date(getEvent.timeEnd)
                                                } else if (getEvent.timeStart > event.timeEnd) {
                                                    // else it is the timeStart of the next event
                                                    timeEndMax = new Date(getEvent.timeStart)
                                                    break
                                                }
                                            }
                                            const newEventTimeStart = new Date(newEvent.timeStart)
                                            const newEventTimeEnd = new Date(newEvent.timeEnd)
                                            return (
                                                <>
                                                    <p>{newEventTimeStart.toLocaleTimeString()}</p> 
                                                    <input type='number' name='timeStartHour'
                                                        value={newEventTimeStart.getHours()}
                                                        onChange={({ target }) => {
                                                            newEventTimeStart.setHours(target.value)
                                                            if (newEventTimeStart > newEventTimeEnd ||
                                                                newEventTimeStart < timeStartMax) {
                                                                newEventTimeStart.setMinutes(0)
                                                            }
                                                            updateEventForm({
                                                                ...newEvent,
                                                                timeStart: newEventTimeStart.getTime()
                                                            })
                                                        }}
                                                        max={newEventTimeEnd.getHours()}
                                                        min={timeStartMax.getHours()}
                                                    />
                                                    <input type='number' name='timeStartMin'
                                                        value={newEventTimeStart.getMinutes()}
                                                        onChange={({ target }) => {
                                                            newEventTimeStart.setMinutes(target.value)
                                                            updateEventForm({
                                                                ...newEvent,
                                                                timeStart: newEventTimeStart.getTime()
                                                            })
                                                        }}
                                                        max={newEventTimeStart.getHours() < newEventTimeEnd.getHours() ?
                                                            59 : newEventTimeEnd.getMinutes()}
                                                        min={newEventTimeStart.getHours() > timeStartMax.getHours() ?
                                                            0 : timeStartMax.getMinutes()}
                                                    />
                                                    <p>{new Date(newEvent.timeEnd).toLocaleTimeString()}</p> 
                                                    <input type='number' name='timeEndHour'
                                                        value={newEventTimeEnd.getHours()}
                                                        onChange={({ target }) => {
                                                            newEventTimeEnd.setHours(target.value)
                                                            updateEventForm({
                                                                ...newEvent,
                                                                timeEnd: newEventTimeEnd.getTime()
                                                            })
                                                        }}
                                                        max={timeEndMax.getHours()}
                                                        min={newEventTimeStart.getHours()}
                                                    />
                                                    <input type='number' name='timeEndMin'
                                                        value={newEventTimeEnd.getMinutes()}
                                                        onChange={({ target }) => {
                                                            newEventTimeEnd.setMinutes(target.value)
                                                            updateEventForm({
                                                                ...newEvent,
                                                                timeEnd: newEventTimeEnd.getTime()
                                                            })
                                                        }}
                                                        max={newEventTimeEnd.getHours() < timeEndMax.getHours() ?
                                                            59 : timeEndMax.getMinutes()}
                                                        min={newEventTimeStart.getHours() < newEventTimeEnd.getHours() ?
                                                            0 : newEventTimeStart.getMinutes()}
                                                    />
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
                                    <Mutation mutation={REMOVE_EVENT}
                                        variables={{
                                            event: {
                                                _id: getEvent._id
                                            }
                                        }}
                                        update={(cache, { data: { removeEvent }, loading, error }) => {
                                            const { getEvents } = cache.readQuery({
                                                query: GET_EVENTS,
                                                variables: {
                                                    event: {
                                                        hostId: user._id,
                                                        timeStart: day.toDateString()
                                                    }
                                                }
                                            })
                                            cache.writeQuery({
                                                query: GET_EVENTS,
                                                variables: {
                                                    event: {
                                                        hostId: user._id,
                                                        timeStart: day.toDateString()
                                                    }
                                                },
                                                data: {
                                                    getEvents: getEvents.filter(event => event._id !== getEvent._id)
                                                }
                                            })
                                        }}
                                        onCompleted={() => showEventForm()}
                                    >
                                    {(deleteEvent, { data, loading, error }) => (
                                        <input type='button' value='remove'
                                            onClick={() => deleteEvent({ _id: getEvent._id })}
                                        />
                                    )}
                                    </Mutation>
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

export const REMOVE_EVENT = gql`
  mutation RemoveEvent($event: EventInput) {
      removeEvent(event: $event)
  }
`