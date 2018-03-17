import React from 'react'
import { Animated } from 'react-native'
import { Route } from 'react-router-native'
import RouteTransition from '../../transitions/RouteTransition'
import Base from './'

const BaseRoute = props => (
  <Route
    path="/:one/:two"
    exact
    render={() => (
      <RouteTransition
        holdDuration={500}
        animations={{
          rootRoute: {
            range: [0, 1],
            method: Animated.timing,
            duration: 500,
          },
        }}
      >
        {({ animations, match }) => (
          <Base {...props} routeAnimations={animations} routeMatch={match} />
        )}
      </RouteTransition>
    )}
  />
)

export default BaseRoute
