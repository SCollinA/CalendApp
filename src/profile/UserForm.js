import React from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { AppContext, GET_USER } from '../CalendApp'
import { LOGIN } from './LoginForm'

export const UserForm = () => (
    <AppContext.Consumer>
        {({ user }) => (
            <Query query={GET_USER}
                variables={{
                    user: {
                        name: user.name
                    }
                }}
            >
                {({ data: { getUser }, loading, error }) => (
                    <Mutation mutation={UPDATE_USER}
                        update={(cache, { data: { updateUser }, loading, error }) => {
                            const cachedUser = cache.readQuery({
                                query: GET_USER,
                                variables: {
                                    user: {
                                        name: user.name
                                    }
                                },
                            })
                            cache.writeQuery({
                                query: GET_USER,
                                variables: {
                                    user: {
                                        name: updateUser.name
                                    }
                                },
                                data: {
                                    ...cachedUser,
                                    ...updateUser
                                }
                            })
                        }}
                    >
                        {(updateUser, { data, loading, error }) => (
                            <Mutation mutation={LOGIN}
                                fetchPolicy='no-cache'
                            >
                                {(login, { data, loading, error }) => (
                                    <form className='UserForm'
                                        onSubmit={event => {
                                            event.preventDefault()
                                            const newUser = {
                                                name: event.target.name.value,
                                                pwhash: event.target.password.value,
                                                // eventIds: event.target.events.value
                                            }
                                            // login mutation used to check password
                                            login({
                                                variables: {
                                                    user: {
                                                        name: user.name,
                                                        pwhash: event.target.currentPassword.value,
                                                    }
                                                }
                                            })
                                            .then(({ data: { login: { token }}}) => {
                                                token && updateUser({
                                                    variables: {
                                                        oldUser: {
                                                            // only used to find user
                                                            _id: user._id
                                                        },
                                                        newUser,
                                                    }
                                                })
                                            })
                                        }}
                                    >
                                        <input type='text'
                                            name='name'
                                            placeholder='name'
                                            autoComplete='username'
                                        />
                                        <input type='password'
                                            name='password'
                                            placeholder='new password'
                                            autoComplete='new-password'
                                        />
                                        <input type='password'
                                            name='passwordConfirm'
                                            placeholder='new password'
                                            autoComplete='new-password'
                                        />
                                        <input type='password'
                                            name='currentPassword'
                                            placeholder='current password'
                                            autoComplete='current-password'
                                        />
                                        <select name='eventIds' multiple={true}>
                                            {user.eventIds.map((eventId, index) => (
                                                <Query query={GET_EVENT_NAME}
                                                    key={index}
                                                    variables={{ 
                                                        event: { 
                                                            _id: eventId 
                                                        }
                                                    }}
                                                >
                                                    {({ data: { getEvent }, loading, error }) => (
                                                        <option name='eventIds'
                                                            value={getEvent && getEvent.name}
                                                        >
                                                            {getEvent ? getEvent.name : ''}
                                                        </option>
                                                    )}
                                                </Query>
                                            ))}
                                        </select>
                                        <input type='submit' value='update'/>
                                        <input type='reset' value='reset'/>
                                    </form>
                                )}
                            </Mutation>
                        )}
                    </Mutation>                      
                )}
            </Query>
        )}
    </AppContext.Consumer>
)

const UPDATE_USER = gql`
mutation UpdateUser($oldUser: UserInput, $newUser: UserInput) {
    updateUser(oldUser: $oldUser, newUser: $newUser) {
        _id
        name
        eventIds
    }
}
`

const GET_EVENT_NAME = gql`
query GetEvent($event: EventInput) {
    getEvent(event: $event) {
        _id
        name
    }
}
`