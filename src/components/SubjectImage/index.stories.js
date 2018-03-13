import React from 'react'
import { Image, View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import SubjectImage from './'
import { mixins } from '../../shared-styles'

const containerStyle = {
  ...mixins.centerBoth,
}

const Decorate = ({ story }) => <View style={containerStyle}>{story}</View>

storiesOf('SubjectImage', module)
  .addDecorator(story => <Decorate story={story()} />)
  .add('default', () => (
    <SubjectImage>
      <Image source={{ uri: 'https://www.fillmurray.com/300/200.png' }} />
    </SubjectImage>
  ))
  .add('active', () => (
    <SubjectImage isActive>
      <Image source={{ uri: 'https://www.fillmurray.com/300/200.png' }} />
    </SubjectImage>
  ))
