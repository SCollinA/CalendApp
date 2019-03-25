import React from 'react'
import { CalendarDisplay } from './CalendarDisplay'
import { Week } from './Week'
import { Toolbar } from './Toolbar'

export const CalContext = React.createContext({})

export class Calendar extends React.Component {
    constructor(props) {
        super(props)

        this.scrollWeeks = () => {
            console.log('height above display', this.firstWeekRef.current.scrollHeight * 3, 
            'height below display', this.lastWeekRef.current.scrollHeight * 3, 
            'calendar display top', this.calendarDisplayRef.current.scrollTop, 
            'calendar display bottom', this.calendarDisplayRef.current.scrollHeight)
            // if scroll distance is greater than week height
            // remove week
            // and replace on other side
        }

        this.state = {
            weeks: [],
            scrollWeeks: this.scrollWeeks,
        }
        this.calendarDisplayRef = React.createRef()
        this.firstWeekRef = React.createRef()
        this.lastWeekRef = React.createRef()
    }

    componentDidMount() {
        // set up initial dates and weeks
        const dateRange = this.findDateRange()
        this.setState({
            weeks: this.findWeeks(dateRange)
        }, () => this.calendarDisplayRef.current.scrollTo(0, this.calendarDisplayRef.current.scrollHeight / 2))
    }

    findDateRange = () => {
        // find current date
        const firstDay = new Date()
        const dayOfWeek = firstDay.getDay()
        // find 5 weeks ago
        firstDay.setDate(firstDay.getDate() - 35)
        // find sunday of that week
        firstDay.setDate(firstDay.getDate() - dayOfWeek)
        // find 70 days away
        const lastDay = new Date(firstDay.getTime() + 70 * 24 * 60 * 60 * 1000)
        return { firstDay, lastDay }
    }

    findWeeks = (dateRange) => {
        const weeks = []
        const currentDate = new Date(dateRange.firstDay)
        while (currentDate.getTime() < dateRange.lastDay.getTime()) {  
            weeks.push(this.findWeek(currentDate))
        }
        return weeks
    }

    findWeek = (currentDate) => {
        const week = []
        for (let i = 0; i < 7; i++) {
            // add new date
            week.push(new Date(currentDate))
            // update current date
            currentDate.setTime(currentDate.getTime() + 1 * 24 * 60 * 60 * 1000)
        }
        return week
    }

    render() {
        return (
            <CalContext.Provider
                value={this.state}
            >
                <div className='Calendar'>
                    <CalendarDisplay ref={this.calendarDisplayRef}>
                        {this.state.weeks.map((week, index) => (
                            <Week key={index} week={week} ref={(index === 0 && this.firstWeekRef) || (index === 9 && this.lastWeekRef)}/>
                        ))}
                    </CalendarDisplay>
                    <Toolbar/>
                </div>
            </CalContext.Provider>
        )
    }
}