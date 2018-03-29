import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import Map from './'
import AutoPlay from '../../../storybook/AutoPlay'
import scenes from '../../../content/scenes/stream01.json'
import storyStyles from '../../../storybook/styles'
import SceneTransition from '../../transitions/SceneTransition'

storiesOf('components/Map', module)
  .addDecorator(story => <View style={storyStyles.container}>{story()}</View>)
  .add('default', () => (
    <SceneTransition scenes={scenes} currentSceneIndex={0}>
      <Map />
    </SceneTransition>
  ))
  .add('autoPlay', () => (
    <AutoPlay interval={1} propToIncrement="currentSceneIndex">
      <SceneTransition scenes={scenes}>
        <Map />
      </SceneTransition>
    </AutoPlay>
  ))
