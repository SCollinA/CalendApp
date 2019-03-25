import React from 'react'

const CalContext = React.createContext({})

export class Calendar extends React.Component {
    constructor(props) {
        super(props)

        // this.goToToday = () => this.setState({
        //     visibleWeek: 5 // 5th week is current week
        // })

        this.state = {
            // soloMode: true, // this will control what is visible to others
            // visibleWeek: 5, // set initial to current
            // goToToday: this.goToToday,
            calendar: { // calendar is
                // year: new Date().getFullYear(),
                // weeks: [ // array of 10 weeks
                //     { // week is 
                //         days: [ // array of 7 days
                //             { // day is
                //                 events: [ // array of ? events 
                //                     { // event is 
                //                         name: '' // at least a name string
                //                     }
                //                 ]
                //             }
                //         ]
                //     }
                // ]
            }
        }
    }

    componentDidMount() {
        // set up initial dates and weeks
        const weeks = []
        // find current date
        const firstDay = new Date()
        const dayOfWeek = firstDay.getDay()
        // find 5 weeks ago
        firstDay.setDate(firstDay.getDate() - 35)
        // find sunday of that week
        firstDay.setDate(firstDay.getDate() - dayOfWeek)
        // find 70 days away
        const lastDay = new Date(firstDay.getTime() + 70 * 24 * 60 * 60 * 1000)
        console.log(firstDay)
        console.log(lastDay)
    }

    render() {
        return (
            <CalContext.Provider
                value={this.state}
            >
                <div className='Calendar'>

                </div>
            </CalContext.Provider>
        )
    }
}