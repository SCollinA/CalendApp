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
        const weeks = [
            {
                labels: [],
                days: []
            }
        ]
        // find current date
        const today = new Date()
        const dayOfWeek = today.getDay()
        today.setDate(today.getDate() - dayOfWeek)
        console.log(today)
        // // if today is not sunday
        // if (dayOfWeek !== 0) {
        //     // find sunday
        // }
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