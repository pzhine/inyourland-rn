import React from 'react'
import { Image, View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import SubjectImage from './'
import storyStyles from '../../../storybook/styles'

storiesOf('SubjectImage', module)
  .addDecorator(story => <View style={storyStyles.container}>{story()}</View>)
  .add('default', () => (
    <SubjectImage>
      <Image source={{ uri: 'http://www.fillmurray.com/300/200.png' }} />
    </SubjectImage>
  ))
  .add('active', () => (
    <SubjectImage isActive>
      <Image source={{ uri: 'http:///www.fillmurray.com/300/200.png' }} />
    </SubjectImage>
  ))
