import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import NavControls from './'
import AutoPlay from '../../../storybook/AutoPlay'
import SceneTransition from '../../transitions/SceneTransition'
import scenes from '../../../content/scenes/stream0.json'
import storyStyles from '../../../storybook/styles'

storiesOf('components/NavControls', module)
  .addDecorator(story => <View style={storyStyles.container}>{story()}</View>)
  .add('autoPlay', () => (
    <AutoPlay interval={1} propToIncrement="currentSceneIndex">
      <SceneTransition scenes={scenes}>
        <NavControls />
      </SceneTransition>
    </AutoPlay>
  ))
