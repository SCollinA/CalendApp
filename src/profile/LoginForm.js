import React from 'react'
import { AppContext, GET_USER } from '../CalendApp'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import { client } from '../apollo/client';

export const LoginForm = ({ showRegister }) => (
    <AppContext.Consumer>
        {({ login }) => (
            <Mutation mutation={LOGIN}
                onCompleted={({ login: { token, user }}) => {
                    localStorage.setItem('auth-token', token) 
                    login(user)
                    client.query({
                        query: GET_USER,
                        variables: {
                            user: {
                                name: user.name
                            }
                        }
                    })
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
                            <input type='text' 
                                name='name' 
                                placeholder='name'
                                autoComplete='username'
                            />
                        </label>
                        <label>password
                            <input type='password' 
                                name='password' 
                                placeholder='password'
                                autoComplete='current-password'
                            />
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

export const LOGIN = gql`
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