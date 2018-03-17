import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import Base from './'
import AutoPlay from '../../../storybook/AutoPlay'
import scenes from '../../../content/scenes/stream0.json'
import storyStyles from '../../../storybook/styles'
import absmod from '../../lib/absmod'

storiesOf('Base', module)
  .addDecorator(story => <View style={storyStyles.container}>{story()}</View>)
  .add('default', () => <Base locationId={scenes[0].locationId} />)
  .add('autoPlay', () => (
    <AutoPlay interval={1}>
      {sceneIndex => (
        <Base
          locationId={scenes[absmod(sceneIndex, scenes.length)].locationId}
        />
      )}
    </AutoPlay>
  ))
