import React from 'react'
import { AppContext, GET_USER } from '../CalendApp'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export const UserForm = () => (
    <AppContext.Consumer>
        {({ user }) => (
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
                <div className='UserForm'>
                    <p>user form</p>
                </div>
            )}
            </Mutation>
        )}
    </AppContext.Consumer>
)

const UPDATE_USER = gql`
mutation UpdateUser($user: UserInput) {
    updateUser(user: $user) {
        _id
        name
        eventIds
    }
}
`