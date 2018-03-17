import React from 'react'
import { Animated } from 'react-native'
import { Route } from 'react-router-native'
import RouteTransition from '../../transitions/RouteTransition'
import Navigator from './'

const NavigatorRoute = props => (
  <Route
    path="/"
    exact
    render={() => (
      <RouteTransition
        holdDuration={500}
        animations={{
          fadeRoute: {
            range: [0, 1],
            method: Animated.timing,
            duration: 500,
          },
        }}
      >
        {({ transitionOpacityOnMatch }) => (
          <Animated.View style={transitionOpacityOnMatch(true)}>
            <Navigator {...props} />
          </Animated.View>
        )}
      </RouteTransition>
    )}
  />
)

export default NavigatorRoute
