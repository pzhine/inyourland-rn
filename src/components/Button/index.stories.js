import React from 'react'
import { View, Text } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import Button from './'
import storyStyles from '../../../storybook/styles'
import { mixins } from '../../shared-styles'

storiesOf('Button', module)
  .addDecorator(story => <View style={storyStyles.container}>{story()}</View>)
  .add('default', () => (
    <Button
      style={mixins.button}
      onPress={() => {
        console.log('Pressed!')
      }}
    >
      <Text style={mixins.buttonText}>Press me!</Text>
    </Button>
  ))
  .add('disabled', () => (
    <Button
      style={mixins.button}
      isDisabled
      onPress={() => {
        console.log('Pressed!')
      }}
    >
      <Text style={mixins.buttonText}>Press me!</Text>
    </Button>
  ))
