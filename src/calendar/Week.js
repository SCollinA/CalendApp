import React from 'react'
import { Day } from './Day'

export const Week = ({ week }) => (
    <div className='Week'>
        {week.map((day, index) => (
            <Day key={index} day={day}/>
        ))}
    </div>
)