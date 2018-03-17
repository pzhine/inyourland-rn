import React from 'react'
import { View, Animated } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import storyStyles from '../../../storybook/styles'
import PropTransition from './'
import AutoPlay from '../../../storybook/AutoPlay'

const boxStyle = {
  backgroundColor: 'red',
  width: 50,
  height: 50,
}

storiesOf('transitions/PropTransition', module)
  .addDecorator(story => <View style={storyStyles.container}>{story()}</View>)
  .add('up and down', () => (
    <AutoPlay interval={1} propToIncrement="toggle">
      <PropTransition
        holdDuration={500}
        toggle={0}
        propToWatch="toggle"
        animations={{
          upAndDown: {
            isIn: val => val % 2,
            range: [0, 1],
            method: Animated.timing,
            duration: 500,
          },
        }}
      >
        {({ animations }) => (
          <Animated.View
            style={{
              ...boxStyle,
              transform: [
                {
                  translateY: animations.upAndDown.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100],
                  }),
                },
              ],
            }}
          />
        )}
      </PropTransition>
    </AutoPlay>
  ))
