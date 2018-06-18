import React, {Component} from 'react';

class Clock extends Component {

    constructor(props){
        super(props);
        this.state = {
            clock: 'hh:mm:ss tt'
        }
    }

    componentWillMount(){
        this.startTicking()
    }

    render = () => (
        <div className={'widget-clock'}>
            {
                this.state.clock
            }
        </div>
    )

    oneSecond = () => 1000
    getCurrentTime = () => new Date()

    log = message => this.setState({
        clock: message
    })

    serializeClockTime = date =>
        ({
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        })

    civilianHours = clockTime =>
        ({
            ...clockTime,
            hours: (clockTime.hours > 12) ?
                clockTime.hours - 12 :
                clockTime.hours
        })

    appendAMPM = clockTime =>
        ({
            ...clockTime,
            ampm: (clockTime.hours >= 12) ? "PM" : "AM"
        })

    display = target => time => target(time)

    formatClock = format =>
        time =>
            format.replace("hh", time.hours)
                .replace("mm", time.minutes)
                .replace("ss", time.seconds)
                .replace("tt", time.ampm)

    prependZero = key => clockTime =>
        ({
            ...clockTime,
            [key]: (clockTime[key] < 10) ?
                "0" + clockTime[key] :
                clockTime[key]
        })

    compose = (...fns) => {
        return (arg) =>
            fns.reduce(
                (composed, f) => {
                    return f(composed)
                },
                arg)
    }

    convertToCivilianTime = clockTime =>
        this.compose(
            this.appendAMPM,
            this.civilianHours
        )(clockTime)

    doubleDigits = civilianTime =>
        this.compose(
            this.prependZero("hours"),
            this.prependZero("minutes"),
            this.prependZero("seconds")
        )(civilianTime)

    startTicking = () =>
        setInterval(
            this.compose(
                this.getCurrentTime,
                this.serializeClockTime,
                this.convertToCivilianTime,
                this.doubleDigits,
                this.formatClock("hh:mm:ss tt"),
                this.display(this.log)
            ),
            this.oneSecond()
        )
}

export default Clock;
