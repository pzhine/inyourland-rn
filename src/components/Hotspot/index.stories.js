import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import storyStyles from '../../../storybook/styles'
import Hotspot from './'

storiesOf('Hotspot', module).add('default', () => (
  <View style={{ ...storyStyles.container }}>
    <Hotspot left={200} top={150} radius={35} color="#0069FF" ripples={3} />
  </View>
))
