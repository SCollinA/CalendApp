import React from 'react'
import { AppContext, GET_USER } from '../CalendApp'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { LOGIN } from './LoginForm';

export const UserForm = () => (
    <AppContext.Consumer>
        {({ user }) => (
            <Mutation mutation={LOGIN}>
                {(login, { data, loading, error }) => (
                    <Mutation mutation={UPDATE_USER}
                        update={(cache, { data: { updateUser }, loading, error }) => {
                            const cachedUser = cache.readQuery({
                                query: GET_USER,
                                variables: {
                                    _id: updateUser._id
                                }
                            })
                            cache.writeQuery({
                                query: GET_USER,
                                variables: {
                                    _id: updateUser._id
                                },
                                data: {
                                    ...cachedUser,
                                    ...updateUser
                                }
                            })
                        }}
                    >
                    {(updateUser, { data, loading, error }) => (
                        <form className='UserForm'
                            onSubmit={event => {
                                event.preventDefault()
                                const newUser = {
                                    name: event.target.name.value,
                                    pwhash: event.target.password.value,
                                    // eventIds: event.target.events.value
                                }
                                login({
                                    variables: {
                                        user: {
                                            ...user,
                                            pwhash: event.target.currentPassword.value,
                                        }
                                    }
                                })
                                .then(({ login: { token }}) => {
                                    token && updateUser({
                                        variables: {
                                            oldUser: user,
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
                                {user.eventIds.map(eventId => (
                                    <Query query={GET_EVENT_NAME}
                                        variables={{ event: { _id: eventId }}}
                                    >
                                        {({ data: { getEvent: { name }}, loading, error }) => (
                                            <option name='eventIds'
                                                value={name}
                                            />
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