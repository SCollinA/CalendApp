import React from 'react'
import { AboutButton } from './AboutButton'
import { UserButton } from './UserButton'
import { LoginButton } from './LoginButton'

export const Header = () => (
    <div className='Header'>
        <AboutButton/>
        <UserButton/>
        <LoginButton/>
    </div>
)