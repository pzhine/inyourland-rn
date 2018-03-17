import React from 'react'
import { Animated } from 'react-native'
import LocationName from '../../components/LocationName'
import Hotspot from '../../components/Hotspot'
import NavControls from '../../components/NavControls'
import { mixins } from '../../shared-styles'

const Navigator = props => (
  <React.Fragment>
    <Animated.View
      style={{
        ...mixins.fillContainerAbsolute,
        opacity: props.animations.inactiveAnimation,
      }}
    >
      <LocationName {...props} />
      <Hotspot {...props} radius={35} color="#0069FF" ripples={3} />
    </Animated.View>
    <Animated.View
      style={{
        ...mixins.fillContainerAbsolute,
        ...mixins.centerBoth,
        transform: [
          {
            translateY: props.animations.inactiveSpring.interpolate({
              inputRange: [0, 1],
              outputRange: [400, 0],
            }),
          },
        ],
      }}
    >
      <NavControls {...props} />
    </Animated.View>
  </React.Fragment>
)

export default Navigator
