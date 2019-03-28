import React from 'react'

export const Day = ({ day, children }) => (
    <div className='Day'
        onClick={() => null}
    >
        {(day.getMonth() === 0 && day.getDate() === 1) && <p>{day.getFullYear()}</p>}
        {day.getDate() === 1 && <p>{day.getMonth() + 1}</p>}
        <p>{day.getDate()}</p>
        {children}
    </div>
)