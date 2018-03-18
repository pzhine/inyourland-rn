import React from 'react'
import { Animated, Easing } from 'react-native'
import RouteTransition from '../../../../transitions/RouteTransition'
import Base from './'

const BaseRoute = props => (
  <RouteTransition
    holdDuration={500}
    path="/:screen"
    animations={{
      activeAnimation: {
        isIn: nextMatch => nextMatch,
        range: [0, 1],
        method: Animated.spring,
        friction: 170,
        tension: 5,
        inDelay: 300,
        outDelay: 300,
      },
      activeFollowAnimation: {
        isIn: nextMatch => nextMatch,
        range: [0, 1],
        method: Animated.timing,
        duration: 1000,
        easing: Easing.inOut(Easing.sin),
        inDelay: 300,
      },
      inactiveAnimation: {
        isIn: nextMatch => !nextMatch,
        range: [0, 1],
        method: Animated.timing,
        duration: 1000,
      },
    }}
  >
    <Base {...props} />
  </RouteTransition>
)

export default BaseRoute
