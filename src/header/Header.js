import React from 'react'
import { AboutButton } from './AboutButton'
import { UserButton } from './UserButton'

export const Header = () => (
    <div className='Header'>
        <AboutButton/>
        <UserButton/>
    </div>
)