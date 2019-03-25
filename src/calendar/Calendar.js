import React from 'react'
import { Week } from './Week'

const CalContext = React.createContext({})

export class Calendar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            weeks: []
    }

    componentDidMount() {
        // set up initial dates and weeks
        const dateRange = this.findDateRange()
        console.log(dateRange)
        this.setState({
            weeks: this.findWeeks(dateRange)
        })
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
            const week = []
            for (let i = 0; i < 7; i++) {
                // add new date
                week.push(new Date(currentDate))
                // update current date
                currentDate.setTime(currentDate.getTime() + 1 * 24 * 60 * 60 * 1000)
            }
            weeks.push(week)
        }
        return weeks
    }

    render() {
        return (
            <CalContext.Provider
                value={this.state}
            >
                <div className='Calendar'>
                    {this.state.weeks.map(week => (
                        <Week/>
                    ))}
                </div>
            </CalContext.Provider>
        )
    }
}