import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import CurrentSceneButton from './'
import storyStyles from '../../../storybook/styles'
import scenes from '../../../content/scenes/stream01.json'
import AutoPlay from '../../../storybook/AutoPlay'

storiesOf('components/CurrentSceneButton', module)
  .addDecorator(story => <View style={storyStyles.container}>{story()}</View>)
  .add('default', () => (
    <CurrentSceneButton
      onPress={() => {
        console.log('Pressed!')
      }}
      scene={scenes[0]}
      isVisible
    />
  ))
  .add('show/hide', () => (
    <AutoPlay interval={1}>
      {count => (
        <CurrentSceneButton
          scene={scenes[0]}
          isVisible={count % 2}
          onPress={() => {
            console.log('Pressed!')
          }}
        />
      )}
    </AutoPlay>
  ))
