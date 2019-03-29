import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AppContext } from '../CalendApp'
import { CalContext } from './Calendar'
import { GET_EVENTS } from './Week';

export const EventAddButton = ({ timeStart, timeEnd }) => (
    <AppContext.Consumer>
        {({ user }) => (
            <CalContext.Consumer>
                {({ showEventForm }) => (
                    <Mutation mutation={ADD_EVENT}
                        variables={{
                            event: {
                                hostId: user._id,
                                name: 'new event',
                                timeStart,
                                timeEnd,
                            }
                        }}
                        update={(cache, { data: { addEvent }, loading, error}) => {
                            const midnightToday = new Date(timeStart)
                            midnightToday.setHours(0, 0, 0, 0)
                            var data
                            try { // there may not be events on that day yet
                                data = cache.readQuery({
                                    query: GET_EVENTS,
                                    variables: {
                                        event: {
                                            hostId: user._id,
                                            timeStart: midnightToday.toDateString()
                                        }
                                    },
                                })
                            } catch (error) {
                                console.log(error)
                                data = { getEvents: [] }
                            }
                            const { getEvents } = data
                            cache.writeQuery({
                                query: GET_EVENTS,
                                variables: {
                                    event: {
                                        hostId: user._id,
                                        timeStart: midnightToday.toDateString()
                                    }
                                },
                                data: {
                                    getEvents: [
                                        ...getEvents,
                                        addEvent
                                    ]
                                }
                            })
                        }}
                        onCompleted={({ addEvent }) => {
                            showEventForm(addEvent)
                        }}
                    >
                        {(addEvent, { data, loading, error }) => (
                            <div className='EventAddButton'
                                onClick={() => addEvent()}
                            >
                                <p>free time - add event</p>
                            </div>
                        )}
                    </Mutation>               
                )}
            </CalContext.Consumer>
        )}
    </AppContext.Consumer>
)

export const ADD_EVENT = gql`
  mutation AddEvent($event: EventInput) {
      addEvent(event: $event) {
          _id
          name
          timeStart
          timeEnd
      }
  }
`