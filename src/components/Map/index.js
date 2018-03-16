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
  constructor(props) {
    super(props)
    this.nextLocation = props.location
  }
  componentWillReceiveProps(nextProps) {
    const { location, transitions } = nextProps
    this.nextLocation = location
    // calculate transition properties
    if (transitions.location.becameActiveSince(this.props.transitions)) {
      this.nextLocation = transitions.location.nextValue
      console.log(
        'TRANSITION',
        location.locationId,
        this.nextLocation.locationId
      )
      Animated.spring(this.state.moveAnimation, {
        toValue: 1,
        friction: 10,
        delay: 400,
        useNativeDriver: true,
      }).start()
      Animated.timing(this.state.infoAnimation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start()
    }
    if (this.props.location !== nextProps.location) {
      this.setState({
        moveAnimation: new Animated.Value(0),
      })
    }
    if (transitions.location.becameInactiveSince(this.props.transitions)) {
      Animated.timing(this.state.infoAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start()
    }
  }
  render() {
    const { location } = this.props
    return (
      <React.Fragment>
        <Animated.Image
          source={{ uri: getImageUrl('nyc', { map: true }) }}
          style={{
            ...styles.map,
            transform: [
              { scale: location.scale },
              {
                translateX: this.state.moveAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    location.origin[0],
                    this.nextLocation.origin[0],
                  ],
                }),
              },
              {
                translateY: this.state.moveAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    location.origin[1],
                    this.nextLocation.origin[1],
                  ],
                }),
              },
            ],
          }}
        />
        <Animated.View
          style={{
            ...styles.hotspot,
            opacity: this.state.infoAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
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
      </React.Fragment>
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
