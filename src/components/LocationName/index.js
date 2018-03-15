import React, { Component } from 'react'
import { Animated } from 'react-native'
import transitionProps from '../../hoc/transitionProps'
import { variables, mixins } from '../../shared-styles'
import styles from './styles'

const TRANSITION_DURATION = variables.transitions.currentIndex.duration

class LocationName extends Component {
  state = {
    infoAnimation: new Animated.Value(1),
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      Animated.timing(this.state.infoAnimation, {
        toValue: 1,
        duration: TRANSITION_DURATION,
        delay: TRANSITION_DURATION / 4,
        useNativeDriver: true,
      }).start()
    }
  }
  render() {
    const { transitions, location } = this.props
    if (transitions.location.isActive) {
      Animated.timing(this.state.infoAnimation, {
        toValue: 0,
        duration: TRANSITION_DURATION,
        useNativeDriver: true,
      }).start()
    }
    return (
      <Animated.Text
        style={{
          ...mixins.locationText,
          ...styles.locationName,
          opacity: this.state.infoAnimation,
        }}
      >
        {location.name}
      </Animated.Text>
    )
  }
}

export default transitionProps({
  propsToTransition: () => ({
    location: {
      duration: TRANSITION_DURATION,
      compare: ({ pre, post }) => pre === post,
    },
  }),
})(LocationName)
