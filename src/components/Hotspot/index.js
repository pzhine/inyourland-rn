import React from 'react'
import { View, Animated } from 'react-native'
import range from '../../lib/range'
import getLocation from '../../lib/scene/getLocation'
import styles from './styles'

const RIPPLE_DURATION = 3000
const RIPPLE_STAGGER = 1000

const dotStyles = ({ left, top, radius }) => ({
  position: 'absolute',
  left: left - radius / 2,
  top: top - radius / 2,
  borderRadius: radius,
  width: radius,
  height: radius,
})

const Dot = ({ left, top, radius, color }) => (
  <View
    style={{
      ...dotStyles({ left, top, radius }),
      backgroundColor: color,
    }}
  />
)

const Ripple = ({ left, top, radius, color, scale, opacity }) => (
  <Animated.View
    style={{
      ...dotStyles({ left, top, radius }),
      borderWidth: 2,
      borderColor: color,
      opacity,
      transform: [{ scale }],
    }}
  />
)

const Ripples = props =>
  range(0, props.ripples - 1).map(idx => (
    <Ripple
      {...props}
      key={idx}
      scale={props.animations[idx].interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
      })}
      opacity={props.animations[idx].interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      })}
    />
  ))

class Hotspot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rippleAnimations: range(0, props.ripples - 1).map(
        () => new Animated.Value(0)
      ),
    }
  }
  componentDidMount() {
    range(0, this.props.ripples - 1).map(idx => this.ripple(idx, true))
  }
  ripple(index, isFirst) {
    Animated.timing(this.state.rippleAnimations[index], {
      toValue: 1,
      duration: RIPPLE_DURATION,
      delay: isFirst ? RIPPLE_STAGGER * index : 0,
      useNativeDriver: true,
    }).start()
    setTimeout(() => {
      const rippleAnimations = [...this.state.rippleAnimations]
      rippleAnimations[index] = new Animated.Value(0)
      this.setState({ rippleAnimations })
      // setTimeout(() => this.ripple(index), 10)
      this.ripple(index)
    }, RIPPLE_DURATION + (isFirst ? RIPPLE_STAGGER * index : 0))
  }
  render() {
    const { locationId, animations } = this.props
    const location = getLocation(locationId)
    const coords = { left: location.pin[0], top: location.pin[1] }
    return (
      <Animated.View
        pointerEvents="box-none"
        style={{
          ...styles.hotspot,
          opacity: animations.locationInfo,
        }}
      >
        <Dot {...this.props} {...coords} />
        <Ripples
          {...this.props}
          {...coords}
          animations={this.state.rippleAnimations}
        />
      </Animated.View>
    )
  }
}

export default Hotspot
