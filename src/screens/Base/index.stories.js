import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import BaseRoute from './route'
import { NativeRouter, Route, Redirect } from 'react-router-native'
import AutoPlay from '../../../storybook/AutoPlay'
import scenes from '../../../content/scenes/stream0.json'
import storyStyles from '../../../storybook/styles'
import SceneTransition from '../../transitions/SceneTransition'

storiesOf('screens/Base', module)
  .addDecorator(story => (
    <NativeRouter>
      <View style={storyStyles.container}>{story()}</View>
    </NativeRouter>
  ))
  .add('default', () => (
    <SceneTransition scenes={scenes} currentSceneIndex={0}>
      <BaseRoute />
    </SceneTransition>
  ))
  .add('active subject', () => (
    <SceneTransition scenes={scenes} currentSceneIndex={0}>
      <Route exact path="/" render={() => <Redirect to="/subject/0/about" />} />
      <BaseRoute />
    </SceneTransition>
  ))
  .add('autoPlay', () => (
    <AutoPlay interval={1} propToIncrement="currentSceneIndex">
      <SceneTransition scenes={scenes}>
        <BaseRoute />
      </SceneTransition>
    </AutoPlay>
  ))
