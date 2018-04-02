import React from 'react'
import { View, Animated } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import Map from './'
import AutoPlay from '../../../storybook/AutoPlay'
import scenes from '../../../content/scenes/stream01.json'
import storyStyles from '../../../storybook/styles'
import SceneTransition from '../../transitions/SceneTransition'
import PropTransition from '../../transitions/PropTransition'

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
  .add('blur transition', () => (
    <AutoPlay interval={1} propToIncrement="toggle">
      <PropTransition
        holdDuration={500}
        propToWatch="toggle"
        toggle={0}
        animations={{
          activeAnimation: {
            isIn: val => val % 2,
            range: [0, 1],
            method: Animated.timing,
            duration: 500,
          },
        }}
      >
        <Map locationId={scenes[0].locationId} />
      </PropTransition>
    </AutoPlay>
  ))
