import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AppContext } from '../CalendApp'
import { GET_EVENTS } from './Week';

export const EventAddButton = ({ timeStart, timeEnd }) => (
    <AppContext.Consumer>
        {({ user }) => (
            <Mutation mutation={ADD_EVENT}
                variables={{
                    event: {
                        hostId: user._id,
                        name: 'new event',
                        timeStart,
                        timeEnd
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
                                timeStart: midnightToday
                            }
                        }
                    })
                    cache.writeQuery({
                        query: GET_EVENTS,
                        variables: {
                            event: {
                                hostId: user._id,
                                timeStart: midnightToday
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