import React from 'react'
import { CalContext } from './Calendar'
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag'

export const EventForm = ({ event }) => (
    <CalContext.Consumer>
        {({ showEventForm, newEvent, updateEventForm }) => (
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
                            // cache.writeQuery({
                            //     query: GET_EVENT,
                            //     variables: {
                            //         event: updateEvent
                            //     },
                            //     data: {
                            //         getEvent: updateEvent
                            //     }
                            // })
                        }}
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
                                    {getEvent.guestIds.map(guestId => (
                                        <p>{guestId}</p>
                                    ))}
                                    <p onClick={() => showEventForm()}>
                                        close
                                    </p>
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
)

export const GET_EVENT = gql`
  query GetEvent($event: EventInput) {
      getEvent(event: $event) {
          _id
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