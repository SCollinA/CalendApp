import React from 'react'
import { CalendarDisplay } from './CalendarDisplay'
import { Week } from './Week'
import { Toolbar } from './Toolbar'

export const CalContext = React.createContext({})

export class Calendar extends React.Component {
    constructor(props) {
        super(props)

        this.goToToday = () => {
            const dateRange = this.findDateRange()
            const weeks = this.findWeeks(dateRange)
            this.setState({ weeks}, () => this.thisWeekRef.current.scrollIntoView())
        }

        this.scrollWeeks = () => {
            // if scroll distance is greater than week height
            const thisWeek = this.thisWeekRef.current
            // const lastWeek = this.lastWeekRef.current
            const calendarDisplay = this.calendarDisplayRef.current
            // if scrolled down one week
            if (calendarDisplay.scrollTop > thisWeek.scrollHeight * 4) {
                // update the weeks in state
                const week = this.findWeek(new Date(this.state.weeks[this.state.weeks.length - 1][6].getTime() + 1 * 24 * 60 * 60 * 1000))
                this.setState({
                    weeks: [
                        // remove the first week
                        ...this.state.weeks.slice(1),
                        // add in a new weeks using the last weeks last date + one day
                        week
                    ]
                })
                // , () => calendarDisplay.scrollTo(0, thisWeek.scrollHeight * 3))
            // if scrolled up one week
            } else if (calendarDisplay.scrollTop < thisWeek.scrollHeight * 3) {
                // update the weeks in state
                this.setState({
                    weeks: [
                        // add in a new week using the first weeks first day - one week
                        this.findWeek(new Date(this.state.weeks[0][0].getTime() - 7 * 24 * 60 * 60 * 1000)),
                        // add in remaining weeks except last week
                        ...this.state.weeks.slice(0, this.state.weeks.length - 1)
                    ]
                })
                // , () => calendarDisplay.scrollTo(0, thisWeek.scrollHeight * 4))
            }
        }

        this.showDayDetail = day => this.setState({ day })

        this.showEventForm = event => this.setState({ 
            event,
            newEvent: event,
        })

        this.updateEventForm = newEvent => this.setState({ newEvent })

        this.state = {
            day: null,
            event: null,
            weeks: [],
            goToToday: this.goToToday,
            scrollWeeks: this.scrollWeeks,
            showDayDetail: this.showDayDetail,
            showEventForm: this.showEventForm,
            newEvent: null,
            updateEventForm: this.updateEventForm,
        }
        this.calendarDisplayRef = React.createRef()
        this.thisWeekRef = React.createRef()
    }

    componentDidMount() {
        // set up initial dates and weeks
        this.goToToday()
    }

    findDateRange = () => {
        // find current date
        const firstDay = new Date()
        // set time to midnight
        firstDay.setHours(0, 0, 0, 0)
        const dayOfWeek = firstDay.getDay()
        // find 5 weeks ago
        firstDay.setDate(firstDay.getDate() - 28)
        // find sunday of that week
        firstDay.setDate(firstDay.getDate() - dayOfWeek)
        // find 70 days away
        const lastDay = new Date(firstDay.getTime() + 70 * 24 * 60 * 60 * 1000)
        return { firstDay, lastDay }
    }

    findWeeks = dateRange => {
        const weeks = []
        const currentDate = new Date(dateRange.firstDay)
        while (currentDate.getTime() < dateRange.lastDay.getTime()) {  
            console.log(currentDate)
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
            // if time is now 1 AM or 11 PM, DST happened
            if (currentDate.getHours() === 1) { currentDate.setHours(0) }
            else if (currentDate.getHours() === 23) { 
                currentDate.setHours(0)
                currentDate.setDate(currentDate.getDate() + 1)
            }
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
                        {this.state.weeks.map((week, index) => {
                            const isThisWeek = index === 4
                            return (
                                <Week 
                                    className={isThisWeek ? 
                                        'thisWeek' : 
                                        ''}
                                    key={week[0].toDateString()} 
                                    week={week} 
                                    ref={isThisWeek ? this.thisWeekRef : null}
                                >
                                    {isThisWeek &&
                                        <p className='yearLabel'>
                                            {week[0].getFullYear()}
                                        </p>}
                                    {isThisWeek &&
                                        <p className='monthLabel'>
                                            {week[0].getMonth() + 1}
                                        </p>}
                                </Week>
                            )
                        })}
                    </CalendarDisplay>
                    <Toolbar/>
                </div>
            </CalContext.Provider>
        )
    }
}