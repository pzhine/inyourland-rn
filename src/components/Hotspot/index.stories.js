import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import storyStyles from '../../../storybook/styles'
import scenes from '../../../content/scenes/stream0.json'
import AutoPlay from '../../../storybook/AutoPlay'
import SceneTransition from '../../transitions/SceneTransition'
import Hotspot from './'

storiesOf('components/Hotspot', module)
  .addDecorator(story => <View style={storyStyles.container}>{story()}</View>)
  .add('default', () => (
    <SceneTransition scenes={scenes} currentSceneIndex={0}>
      <Hotspot radius={35} color="#0069FF" ripples={3} />
    </SceneTransition>
  ))
  .add('autoPlay', () => (
    <AutoPlay interval={1} propToIncrement="currentSceneIndex">
      <SceneTransition scenes={scenes}>
        <Hotspot radius={35} color="#0069FF" ripples={3} />
      </SceneTransition>
    </AutoPlay>
  ))
