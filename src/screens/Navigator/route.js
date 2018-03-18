import React from 'react'
import { Animated } from 'react-native'
import { Route } from 'react-router-native'
import RouteTransition from '../../transitions/RouteTransition'
import Navigator from './'

const NavigatorRoute = props => (
  <Route
    path="/:screen?/:subjectId?/:sectionId?"
    exact
    render={() => (
      <RouteTransition
        holdDuration={500}
        animations={{
          inactiveSpring: {
            isIn: nextMatch => !nextMatch.params.screen,
            range: [0, 1],
            method: Animated.spring,
            friction: 70,
            tension: 8,
            delay: 300,
          },
          inactiveAnimation: {
            isIn: nextMatch => !nextMatch.params.screen,
            range: [0, 1],
            method: Animated.timing,
            duration: 1000,
          },
        }}
      >
        <Navigator {...props} />
      </RouteTransition>
    )}
  />
)

export default NavigatorRoute
