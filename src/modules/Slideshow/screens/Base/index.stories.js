import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { NativeRouter, Redirect } from 'react-router-native'
import { Provider } from 'react-redux'
import store from '../../../../redux/configureStore'
import BaseRoute from './route'
import AutoPlay from '../../../../../storybook/AutoPlay'
import scenes from '../../../../../content/scenes/stream01.json'
import storyStyles from '../../../../../storybook/styles'
import SceneTransition from '../../../../transitions/SceneTransition'

storiesOf('modules/Slideshow/Base', module)
  .addDecorator(story => (
    <NativeRouter>
      <Provider store={store}>
        <View style={storyStyles.container}>{story()}</View>
      </Provider>
    </NativeRouter>
  ))
  .add('default', () => (
    <SceneTransition scenes={scenes} currentSceneIndex={0}>
      <BaseRoute />
    </SceneTransition>
  ))
  .add('nav to subject', () => (
    <SceneTransition scenes={scenes} currentSceneIndex={0}>
      <AutoPlay interval={1}>
        {currentIndex =>
          currentIndex % 2 ? (
            <Redirect to="/subject/0/about" />
          ) : (
            <Redirect to="/" />
          )
        }
      </AutoPlay>
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
