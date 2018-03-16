import React from 'react'
import { Animated } from 'react-native'
import getImageUrl from '../../lib/scene/getImageUrl'
import styles from './styles'
import getLocation from '../../lib/scene/getLocation'

const Map = ({ animations, locationId, nextLocationId }) => {
  const location = getLocation(locationId)
  const nextLocation =
    (nextLocationId && getLocation(nextLocationId)) || location
  return (
    <Animated.Image
      source={{ uri: getImageUrl('nyc', { map: true }) }}
      style={{
        ...styles.map,
        transform: [
          { scale: location.scale },
          {
            translateX: animations.mapMove.interpolate({
              inputRange: [0, 1],
              outputRange: [nextLocation.origin[0], location.origin[0]],
            }),
          },
          {
            translateY: animations.mapMove.interpolate({
              inputRange: [0, 1],
              outputRange: [nextLocation.origin[1], location.origin[1]],
            }),
          },
        ],
      }}
    />
  )
}

export default Map
