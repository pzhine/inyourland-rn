import React from 'react'
import { Animated } from 'react-native'
import { BlurView } from 'react-native-blur'
import getImageUrl from '../../lib/scene/getImageUrl'
import styles from './styles'
import getLocation from '../../lib/scene/getLocation'

const Map = ({ animations, locationId, nextLocationId }) => {
  const location = getLocation(locationId)
  const nextLocation =
    (nextLocationId && getLocation(nextLocationId)) || location
  const { mapMove, activeAnimation } = animations
  return (
    <React.Fragment>
      <Animated.Image
        source={{ uri: getImageUrl('nyc', { map: true }) }}
        style={{
          ...styles.map,
          transform: [
            { scale: location.scale },
            ...(mapMove
              ? [
                  {
                    translateX: mapMove.interpolate({
                      inputRange: [0, 1],
                      outputRange: [nextLocation.origin[0], location.origin[0]],
                    }),
                  },
                  {
                    translateY: mapMove.interpolate({
                      inputRange: [0, 1],
                      outputRange: [nextLocation.origin[1], location.origin[1]],
                    }),
                  },
                ]
              : []),
          ],
        }}
      />
      <Animated.View
        style={{
          ...styles.blurViewContainer,
          opacity: activeAnimation
            ? activeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              })
            : 0,
        }}
      >
        <BlurView blurType="dark" blurAmount={5} style={styles.blurView} />
      </Animated.View>
    </React.Fragment>
  )
}

export default Map
