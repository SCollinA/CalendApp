import React from 'react'

export default ({ hideLoginForm }) => (
    <div className='LoginForm'
        onClick={hideLoginForm}
    >
        <p>login form</p>
    </div>
)