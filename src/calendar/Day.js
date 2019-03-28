import React from 'react'

export const Day = ({ day, children, showDayDetail }) => (
    <div className='Day'
        onClick={() => showDayDetail(day)}
    >
        {/* {(day.getMonth() === 0 && day.getDate() === 1) && 
            <p className='yearLabel'>{day.getFullYear()}</p>} */}
        {/* {day.getDate() === 1 && 
            <p className='monthLabel'>{day.getMonth() + 1}</p>} */}
        <p className='dayLabel'>{day.getDate()}</p>
        {children}
    </div>
)