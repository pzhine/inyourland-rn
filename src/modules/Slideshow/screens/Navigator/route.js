import React from 'react'
import { Animated } from 'react-native'
import RouteTransition from '../../../../transitions/RouteTransition'
import Navigator from './'

const NavigatorRoute = props => (
  <RouteTransition
    holdDuration={500}
    path="/:screen"
    animations={{
      inactiveSpring: {
        isIn: nextMatch => !nextMatch,
        range: [0, 1],
        method: Animated.spring,
        friction: 70,
        tension: 6,
        delay: 300,
      },
      inactiveAnimation: {
        isIn: nextMatch => !nextMatch,
        range: [0, 1],
        method: Animated.timing,
        duration: 400,
      },
    }}
  >
    <Navigator
      {...props}
      currentSceneIndex={props.currentSceneIndex % props.scenes.length}
    />
  </RouteTransition>
)

export default NavigatorRoute
