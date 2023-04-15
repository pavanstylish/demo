// Write your code here
import {Component} from 'react'

const initialState = {
  timeMin: 25,
  timeSec: 0,
  show: false,
}

class DigitalTimer extends Component {
  state = initialState

  onToggleButton = () => {
    this.setState(prevState => {
      const {show} = prevState
      return {
        show: !show,
      }
    })
  }

  add = () =>
    this.setState(prevState => ({
      timeMin: prevState.timeMin + 1,
    }))

  sub = () =>
    this.setState(prevState => ({
      timeMin: prevState.timeMin - 1,
    }))

  reset = () => {
    this.setState(initialState)
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimeElapsedInSeconds = () => {
    const {timerMin, timeSec} = this.state
    const isTimerCompleted = timeSec === timerMin * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({show: false})
    } else {
      this.setState(prevState => ({
        timeSec: prevState.timeSec + 1,
      }))
    }
  }

  running = () => {
    const {show, timeMin, timeSec} = this.state

    const timeCompleted = timeMin === timeSec * 60

    if (timeCompleted) {
      this.setState({timeMin: 0})
    }

    if (show) {
      this.clearTimerInterval()
      this.setState({show: false})
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({show: !prevState.show}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeMin, timeSec} = this.state
    const totalRemainingSeconds = timeMin * 60 - timeSec
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {show} = this.state
    const startImg =
      'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const pauseImg =
      'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const resetImg =
      'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'
    const imageUrl = show ? startImg : pauseImg
    return (
      <div>
        <h1>Digital Timer</h1>
        <div>
          <p>{timeMin}</p>
          <p>Pause</p>
        </div>
        <div>
          <button type="button" onClick={this.running}>
            <img src={imageUrl} alt="imageUrl" />
            {this.getElapsedSecondsInTimeFormat}
          </button>
          <img src={resetImg} alt="start" onClick={this.reset} />
          <button type="button" onClick={this.sub}>
            -
          </button>
          <p>{timeMin}</p>
          <button type="button" onClick={this.add}>
            +
          </button>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
