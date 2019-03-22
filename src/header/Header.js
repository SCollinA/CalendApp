import React from 'react'
import { AppContext } from '../CalendApp'
import { About } from './About';
import { AboutButton } from './AboutButton'
import { UserForm } from './UserForm';
import { UserButton } from './UserButton'
import { LoginForm } from './LoginForm';
import { LoginButton } from './LoginButton'

export const Header = () => (
    <AppContext.Consumer>
        {({ isAboutVisible, isLoginFormVisible, isUserFormVisible }) => (
            <div className='Header'>
                {!(isUserFormVisible || isLoginFormVisible) && 
                ((isAboutVisible &&
                    <About/>) ||
                    <AboutButton/>)}
                {!(isAboutVisible || isLoginFormVisible) && 
                ((isUserFormVisible &&
                    <UserForm/>) ||
                    <UserButton/>)}
                {!(isUserFormVisible || isAboutVisible) && 
                ((isLoginFormVisible &&
                    <LoginForm/>) ||
                    <LoginButton/>)}
            </div>
        )}
    </AppContext.Consumer>
)