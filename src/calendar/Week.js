import React from 'react'
import { Day } from './Day'

export const Week = React.forwardRef(({ week }, ref) => (
    <div className='Week' ref={ref}>
        {week.map((day, index) => (
            <Day key={index} day={day}/>
        ))}
    </div>
))