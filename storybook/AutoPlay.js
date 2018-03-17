import React from 'react'

class AutoPlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
    }
  }
  componentDidMount() {
    setInterval(() => {
      const nextIndex = this.state.currentIndex + this.props.interval
      // console.log('AUTOPLAY', nextIndex)
      this.setState({ currentIndex: nextIndex })
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
