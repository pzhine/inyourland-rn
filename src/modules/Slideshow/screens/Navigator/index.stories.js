import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { NativeRouter, Redirect } from 'react-router-native'
import { Provider } from 'react-redux'
import NavigatorRoute from './route'
import store from '../../../../redux/configureStore'
import AutoPlay from '../../../../../storybook/AutoPlay'
import scenes from '../../../../../content/scenes/stream0.json'
import storyStyles from '../../../../../storybook/styles'
import SceneTransition from '../../../../transitions/SceneTransition'

storiesOf('modules/Slideshow/Navigator', module)
  .addDecorator(story => (
    <Provider store={store}>
      <NativeRouter>
        <View style={storyStyles.container}>{story()}</View>
      </NativeRouter>
    </Provider>
  ))
  .add('default', () => (
    <SceneTransition scenes={scenes} currentSceneIndex={0}>
      <NavigatorRoute />
    </SceneTransition>
  ))
  .add('autoPlay', () => (
    <AutoPlay interval={1} propToIncrement="currentSceneIndex">
      <SceneTransition scenes={scenes}>
        <NavigatorRoute />
      </SceneTransition>
    </AutoPlay>
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
      <NavigatorRoute />
    </SceneTransition>
  ))
