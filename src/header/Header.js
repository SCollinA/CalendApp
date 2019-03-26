import React from 'react'
import { AboutButton } from './AboutButton'
import { UserButton } from './UserButton'
import { HomeButton } from './HomeButton'

export const Header = () => (
    <div className='Header'>
        <HomeButton/>
        <AboutButton/>
        <UserButton/>
    </div>
)