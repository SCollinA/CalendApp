import React from 'react'
import { AppContext } from '../CalendApp'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'

export const RegisterForm = ({ showLogin }) => (
    <AppContext.Consumer>
        {({ login }) => (
            <Mutation mutation={REGISTER}
                onCompleted={({ addUser: { token, user }}) => {
                    localStorage.setItem('auth-token', token)
                    localStorage.setItem('user-name', user.name)
                    login(user)
                }}
                onError={err => window.alert(err.message)}
            >
                {(registerMutation, { data, loading, error }) => (
                    <form className='RegisterForm'
                        onSubmit={event => {
                            event.preventDefault()
                            const user = {
                                name: event.target.name.value,
                                pwhash: event.target.password.value
                            }
                            registerMutation({
                                variables: {
                                    user
                                },
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
                                autoComplete='new-password'
                            />
                        </label>
                        <label>password
                            <input type='password' 
                                name='passwordConfirm' 
                                placeholder='confirm password'
                                autoComplete='new-password'
                            />
                        </label>
                        <label>submit
                            <input type='submit' value='register'/>
                        </label>
                        <input type='button' onClick={showLogin} value='login'/>
                    </form>
                )}
            </Mutation>
        )}
    </AppContext.Consumer>
)

const REGISTER = gql`
mutation Register($user: UserInput) {
    addUser(user: $user) {
        token
        user {
            _id
            name
            eventIds
        }
    }
}
`