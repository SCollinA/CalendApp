import React from 'react'

export const Day = ({ day, children }) => (
    <div className='Day'
        onClick={() => null}
    >
        {/* {(day.getMonth() === 0 && day.getDate() === 1) && 
            <p className='yearLabel'>{day.getFullYear()}</p>} */}
        {/* {day.getDate() === 1 && 
            <p className='monthLabel'>{day.getMonth() + 1}</p>} */}
        <p className='dayLabel'>{day.getDate()}</p>
        {children}
    </div>
)