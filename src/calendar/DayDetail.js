import React from 'react'
import { Query } from 'react-apollo'
import { CalContext } from './Calendar';
import { GET_EVENTS } from './Week';
import { AppContext } from '../CalendApp';
import { Loading } from '../Loading';
import { EventLabel } from './EventLabel';

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
                                {getEvents.map((event, index) => (
                                    <EventLabel key={index} event={event}/>
                                ))}
                                <p onClick={() => showDayDetail()}>close</p>
                            </div>
                        )}    
                    </Query>
                )}
            </CalContext.Consumer>
        )}
    </AppContext.Consumer>
)