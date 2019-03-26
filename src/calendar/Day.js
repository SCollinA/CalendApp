import React from 'react'

export const Day = ({ day }) => (
    <div className='Day'>
        {day.getMonth() === 0 && <p>{day.getFullYear()}</p>}
        {day.getDate() === 1 && <p>{day.getMonth() + 1}</p>}
        <p>{day.getDate()}</p>
    </div>
)