import React from 'react'
import { View, Image } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import Carousel from './'
import scenes from '../../../content/scenes/stream0.json'
import AutoPlay from '../../../storybook/AutoPlay'
import storyStyles from '../../../storybook/styles'
import getImageUrl from '../../lib/scene/getImageUrl'

const route = { animations: {}, screen: 'navigator', subjectIndex: 0 }

storiesOf('Carousel', module)
  .addDecorator(story => (
    <View style={storyStyles.container}>
      <Image
        source={{ uri: getImageUrl('nyc', { map: true }) }}
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
  .add('default', () => (
    <Carousel scenes={scenes} currentSceneIndex={0} route={route} />
  ))
  .add('autoPlay forward', () => (
    <AutoPlay interval={1} propToIncrement="currentSceneIndex">
      <Carousel scenes={scenes} route={route} />
    </AutoPlay>
  ))
  .add('autoPlay reverse', () => (
    <AutoPlay interval={-1} propToIncrement="currentSceneIndex">
      <Carousel scenes={scenes} route={route} />
    </AutoPlay>
  ))
