import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Day } from './Day'
import { EventLabel } from './EventLabel'
import { AppContext } from '../CalendApp'
import { Loading } from '../Loading';

export const Week = React.forwardRef(({ week, children }, ref) => (
    <AppContext.Consumer>
        {({ user }) => (
            <div className='Week' ref={ref}>
                {children}
                {week.map((day, index) => (
                    <Query query={GET_EVENTS}
                        key={index}
                        variables={{
                            event: {
                                hostId: user._id,
                                timeStart: day.toDateString()
                            }
                        }}
                    >
                        {({ data: { getEvents }, loading, error }) => (
                            <Day day={day}>
                                {!loading && getEvents.map((event, index) => (
                                    <EventLabel key={index} event={event}/>
                                ))}
                                {loading &&
                                    <Loading/>}
                            </Day>
                        )}    
                    </Query>
                ))}
            </div>
        )}
    </AppContext.Consumer>
))

export const GET_EVENTS = gql`
  query GetEvents($event: EventInput) {
      getEvents(event: $event) {
          _id
          name
      }
  }
`