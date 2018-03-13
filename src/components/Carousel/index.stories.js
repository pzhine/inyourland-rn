import React, { Component } from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import Carousel from './'
import scenes from '../../../content/scenes/stream0.json'
import storyStyles from '../../../storybook/styles'

class AutoPlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
    }
  }
  componentDidMount() {
    setInterval(() => {
      const nextIndex = this.state.currentIndex + this.props.interval
      console.log('AUTOPLAY', nextIndex)
      this.setState({ currentIndex: nextIndex })
    }, 1500)
  }
  render() {
    return <Carousel scenes={scenes} currentIndex={this.state.currentIndex} />
  }
}

storiesOf('Carousel', module)
  .addDecorator(story => <View style={storyStyles.container}>{story()}</View>)
  .add('default', () => <Carousel scenes={scenes} currentIndex={0} />)
  .add('autoPlay forward', () => <AutoPlay interval={1} />)
  .add('autoPlay reverse', () => <AutoPlay interval={-1} />)
