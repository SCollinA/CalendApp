import React from 'react'

export const Day = ({ day, children, showDayDetail }) => (
    <div className='Day'
        onClick={() => showDayDetail(day)}
    >
        <p className='dayLabel'>{day.getDate()}</p>
        {children}
    </div>
)