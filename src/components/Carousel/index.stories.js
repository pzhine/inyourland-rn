import React, { Component } from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import Carousel from './'
import scenes from '../../../content/scenes/stream0.json'
import { mixins } from '../../shared-styles'

const containerStyle = {
  ...mixins.centerBoth,
}

const Decorate = ({ story }) => <View style={containerStyle}>{story}</View>

class AutoPlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
    }
  }
  componentDidMount() {
    setInterval(() => {
      let nextIndex = this.state.currentIndex + 1
      if (nextIndex >= scenes.length) {
        nextIndex = 0
      }
      console.log('AUTOPLAY', nextIndex)
      this.setState({ currentIndex: nextIndex })
    }, 3000)
  }
  render() {
    return <Carousel scenes={scenes} currentIndex={this.state.currentIndex} />
  }
}

storiesOf('Carousel', module)
  .addDecorator(story => <Decorate story={story()} />)
  .add('default', () => <Carousel scenes={scenes} currentIndex={0} />)
  .add('autoPlay', () => <AutoPlay />)
