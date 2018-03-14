import React, { Component } from 'react'
import { Animated } from 'react-native'
import transitionProps from '../../hoc/transitionProps'
import getImageUrl from '../../lib/scene/getImageUrl'
import styles from './styles'
import { variables } from '../../shared-styles'
import Hotspot from '../Hotspot'

const MOVE_TRANSITION_DURATION = 1000

class Map extends Component {
  state = {
    moveAnimation: new Animated.Value(0),
    infoAnimation: new Animated.Value(1),
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      this.setState({
        moveAnimation: new Animated.Value(0),
      })
    }
    Animated.timing(this.state.infoAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }
  render() {
    const { location, transitions } = this.props
    let nextLocation = location
    // calculate transition properties
    if (transitions.location.isActive) {
      nextLocation = transitions.location.nextValue
      console.log('TRANSITION', location.locationId, nextLocation.locationId)
      Animated.timing(this.state.infoAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
      Animated.spring(this.state.moveAnimation, {
        toValue: 1,
        friction: 10,
        delay: 400,
        // duration: MOVE_TRANSITION_DURATION,
        useNativeDriver: true,
      }).start()
    }
    return [
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
      />,
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          opacity: this.state.infoAnimation,
        }}
      >
        <Hotspot
          left={location.pin[0]}
          top={location.pin[1]}
          color={variables.colors.hotspot}
          radius={24}
          ripples={3}
        />
      </Animated.View>,
    ]
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
