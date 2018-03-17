import React from 'react'
import { Animated } from 'react-native'
import PropTransition from '../PropTransition'
import absmod from '../../lib/absmod'

const SceneTransition = ({ children, scenes, currentSceneIndex }) => {
  const { locationId } = scenes[absmod(currentSceneIndex, scenes.length)]
  return (
    <PropTransition
      holdDuration={1000}
      propToWatch="locationId"
      locationId={locationId}
      animations={{
        mapMove: {
          method: Animated.spring,
          range: [0, 1],
          friction: 10,
          outDelay: 400,
          oneWay: true,
        },
        locationInfo: {
          range: [0, 1],
          method: Animated.timing,
          duration: 400,
        },
      }}
    >
      {({ animations, currentValue, nextValue }) => {
        const childProps = {
          animations,
          scenes,
          currentSceneIndex,
          locationId: currentValue,
          nextLocationId: nextValue,
        }
        return React.Children.map(children, child =>
          React.cloneElement(child, childProps)
        )
      }}
    </PropTransition>
  )
}

export default SceneTransition
