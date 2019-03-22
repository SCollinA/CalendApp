import React from 'react'
import { AppContext } from '../CalendApp'
// import { Mutation } from 'react-apollo';

export const UserForm = () => (
    <AppContext.Consumer>
        {({ user }) => (
            // <Mutation mutation={UPDATE_USER}
            //     update={(cache, { data, loading, error }) => {

            //     }}
            <div className='UserForm'>
                <p>user form</p>
            </div>
        )}
    </AppContext.Consumer>
)