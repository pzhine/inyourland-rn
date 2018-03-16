import React from 'react'
import { Animated } from 'react-native'
import { mixins } from '../../shared-styles'
import getLocation from '../../lib/scene/getLocation'
import styles from './styles'

const LocationName = ({ locationId, animations }) => {
  const location = getLocation(locationId)
  return (
    <Animated.Text
      style={{
        ...mixins.locationText,
        ...styles.locationName,
        opacity: animations.locationInfo,
      }}
    >
      {location.name}
    </Animated.Text>
  )
}

export default LocationName
