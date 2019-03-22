import React from 'react'

export default ({ showUserForm }) => (
    <div className='UserButton'
        onClick={showUserForm}
    >
        <p>Welcome, User</p>
    </div>
)