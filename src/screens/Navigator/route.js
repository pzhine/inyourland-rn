import React from 'react'
import { Animated } from 'react-native'
import { Route } from 'react-router-native'
import RouteTransition from '../../transitions/RouteTransition'
import Navigator from './'
import { mixins } from '../../shared-styles'

const NavigatorRoute = props => (
  <Route
    path="/:screen?/:subjectIndex?/:sectionIndex?"
    exact
    render={() => (
      <RouteTransition
        holdDuration={500}
        animations={{
          inactiveAnimation: {
            isIn: nextMatch => !nextMatch.params.screen,
            range: [0, 1],
            method: Animated.timing,
            duration: 1000,
          },
        }}
      >
        {({ animations }) => (
          <Animated.View
            style={{
              ...mixins.fillContainerAbsolute,
              opacity: animations.inactiveAnimation,
            }}
          >
            <Navigator {...props} />
          </Animated.View>
        )}
      </RouteTransition>
    )}
  />
)

export default NavigatorRoute
