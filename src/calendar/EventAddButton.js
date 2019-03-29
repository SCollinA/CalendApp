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
                            const getEvents = cache.readQuery({
                                query: GET_EVENTS,
                                variables: {
                                    event: {
                                        hostId: user._id,
                                        timeStart: midnightToday.toDateString()
                                    }
                                }
                            })
                            cache.writeQuery({
                                query: GET_EVENTS,
                                variables: {
                                    event: {
                                        hostId: user._id,
                                        timeStart: midnightToday.toDateString()
                                    }
                                },
                                data: [
                                    ...getEvents,
                                    addEvent
                                ]
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
          timeEnd
      }
  }
`