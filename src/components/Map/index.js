import React, { Component } from 'react'
import { Animated } from 'react-native'
import transitionProps from '../../hoc/transitionProps'
import getImageUrl from '../../lib/scene/getImageUrl'
import styles from './styles'

const MOVE_TRANSITION_DURATION = 1000

class Map extends Component {
  state = {
    moveAnimation: new Animated.Value(0),
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      this.setState({ moveAnimation: new Animated.Value(0) })
    }
  }
  render() {
    const { location, transitions } = this.props
    let nextLocation = location
    // calculate transition properties
    if (transitions.location.isActive) {
      nextLocation = transitions.location.nextValue
      console.log('TRANSITION', location.locationId, nextLocation.locationId)
      Animated.spring(this.state.moveAnimation, {
        toValue: 1,
        friction: 10,
        delay: 400,
        // duration: MOVE_TRANSITION_DURATION,
        useNativeDriver: true,
      }).start()
    }
    return (
      <Animated.Image
        source={{ uri: getImageUrl('nyc', { map: true }) }}
        style={{
          ...styles.map,
          transform: [
            { scale: location.scale },
            {
              translateX: this.state.moveAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [location.origin[0], nextLocation.origin[0]],
              }),
            },
            {
              translateY: this.state.moveAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [location.origin[1], nextLocation.origin[1]],
              }),
            },
          ],
        }}
      />
    )
  }
}

export default transitionProps({
  propsToTransition: () => ({
    location: {
      duration: MOVE_TRANSITION_DURATION,
      compare: ({ pre, post }) => pre === post,
    },
  }),
})(Map)
