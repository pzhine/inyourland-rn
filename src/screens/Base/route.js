import React from 'react'
import { Animated } from 'react-native'
import { Route } from 'react-router-native'
import RouteTransition from '../../transitions/RouteTransition'
import Base from './'

const BaseRoute = props => (
  <Route
    path="/:screen?/:subjectIndex?/:sectionIndex?"
    exact
    render={() => (
      <RouteTransition
        holdDuration={500}
        animations={{
          navigatorToSubject: {
            range: [0, 1],
            method: Animated.timing,
            duration: 500,
          },
        }}
      >
        {({ animations, match }) => (
          <Base
            {...props}
            route={{
              animations,
              ...match.params,
              screen: match.params.screen || 'navigator',
            }}
          />
        )}
      </RouteTransition>
    )}
  />
)

export default BaseRoute
