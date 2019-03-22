import React from 'react'
import { AppContext } from '../CalendApp'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'

export const LoginForm = ({ showRegister }) => (
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
                                name: event.target.name.value,
                                pwhash: event.target.password.value
                            }
                            loginMutation({
                                variables: {
                                    user
                                }
                            })
                        }}
                    >
                        <label>name
                            <input type='text' name='name' placeholder='name'/>
                        </label>
                        <label>password
                            <input type='password' name='password' placeholder='password'/>
                        </label>
                        <label>submit
                            <input type='submit' value='login'/>
                        </label>
                        <input type='button' onClick={showRegister} value='register'/>
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
        user {
            _id
            name
            eventIds
        }
    }
}
`