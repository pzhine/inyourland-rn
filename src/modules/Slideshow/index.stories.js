import React from 'react'
import { NativeRouter } from 'react-router-native'
import { storiesOf } from '@storybook/react-native'
import { Provider } from 'react-redux'
import store from '../../redux/configureStore'
import AutoPlay from '../../../storybook/AutoPlay'
import scenes from '../../../content/scenes/stream0.json'
import Slideshow from './'

storiesOf('modules/Slideshow', module)
  .addDecorator(story => (
    <Provider store={store}>
      <NativeRouter>{story()}</NativeRouter>
    </Provider>
  ))
  .add('default', () => <Slideshow currentSceneIndex={0} scenes={scenes} />)
  .add('autoplay', () => (
    <AutoPlay
      onIncrement={nextIndex =>
        store.dispatch({
          type: 'SCENE_CHANGE',
          payload: {
            mediaId: 'stream0',
            sceneIndex: nextIndex,
          },
        })
      }
    >
      <Slideshow scenes={scenes} />
    </AutoPlay>
  ))
