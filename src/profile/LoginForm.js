import React from 'react'
import { AppContext } from '../CalendApp'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'

export const LoginForm = () => (
    <AppContext.Consumer>
        {({ login }) => (
            <Mutation mutation={LOGIN}
                onCompleted={({ login: { token, user }}) => {
                    localStorage.setItem('auth-token', token)
                    login(user)
                }}
                onError={err => window.alert(err.message)}
            >
                {(loginMutation, { data, loading, error }) => (
                    <form className='LoginForm'
                        onSubmit={event => {
                            event.preventDefault()
                            const user = {
                                name: event.name.value,
                                password: event.password.value
                            }
                            loginMutation(user)
                        }}
                    >
                        <p>login form</p>
                    </form>
                )}
            </Mutation>
        )}
    </AppContext.Consumer>
)

const LOGIN = gql`
mutation Login($user: UserInput) {
    login(user: $user) {
        token
    }
}
`