import React from 'react'

export default ({ showLoginForm }) => (
    <div className='LoginButton'
        onClick={showLoginForm}
    >
        <p>Login/Logout</p>
    </div>
)