import React, { Component } from 'react'
import { View, Image } from 'react-native'
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
    }, 3000)
  }
  render() {
    return <Carousel scenes={scenes} currentIndex={this.state.currentIndex} />
  }
}

storiesOf('Carousel', module)
  .addDecorator(story => (
    <View style={storyStyles.container}>
      <Image
        source={{ uri: 'http://localhost:3000/media/_testmapbg.png' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: 768,
          height: 1024,
        }}
      />
      {story()}
    </View>
  ))
  .add('default', () => <Carousel scenes={scenes} currentIndex={0} />)
  .add('autoPlay forward', () => <AutoPlay interval={1} />)
  .add('autoPlay reverse', () => <AutoPlay interval={-1} />)
