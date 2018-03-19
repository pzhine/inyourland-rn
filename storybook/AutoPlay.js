import React from 'react'

class AutoPlay extends React.Component {
  constructor(props) {
    super(props)
    this.interval = this.props.interval || 1
    this.currentIndex = 0
    this.state = {
      currentIndex: 0,
    }
  }
  componentDidMount() {
    const { jumpEvery } = this.props
    setInterval(() => {
      if (jumpEvery && !(this.currentIndex % jumpEvery)) {
        this.currentIndex += this.props.jumpInterval
      } else {
        this.currentIndex += this.interval
      }
      if (this.props.onIncrement) {
        this.props.onIncrement(this.currentIndex)
      } else {
        this.setState({
          currentIndex: this.currentIndex,
        })
      }
    }, 3000)
  }
  render() {
    if (typeof this.props.children === 'function') {
      return (
        <React.Fragment>
          {this.props.children(this.state.currentIndex)}
        </React.Fragment>
      )
    }
    return React.cloneElement(React.Children.only(this.props.children), {
      [this.props.propToIncrement]: this.state.currentIndex,
    })
  }
}

AutoPlay.defaultProperties = {
  propToIncrement: 'currentIndex',
}

export default AutoPlay
