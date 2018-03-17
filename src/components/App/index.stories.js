import React from 'react'
import { Text, View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import storyStyles from '../../../storybook/styles'
import { mixins } from '../../shared-styles'

storiesOf('components/App', module).add('default', () => (
  <View style={{ ...storyStyles.container, justifyContent: 'space-around' }}>
    <Text style={mixins.titleText}>TITLE FONT</Text>
    <View style={mixins.button}>
      <Text style={mixins.buttonText}>Button Font</Text>
    </View>
    <Text style={mixins.paragraphText}>
      A close relative of the Mallard, the Black Duck is better adapted to
      wooded country. With the clearing of forest, it has steadily lost ground
      to spreading populations of Mallards. In its stronghold along the Atlantic
      Coast it is a hardy bird, wintering farther north than most dabbling
      ducks. It is among the few dabblers to prosper in tidewater areas; pairs
      and small parties of Black Ducks are often seen flying over the salt
      marsh, their white wing linings flashing in bright contrast to their dark
      bodies.
    </Text>
  </View>
))
