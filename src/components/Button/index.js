import React from 'react'
import { TouchableWithoutFeedback, Animated, View } from 'react-native'
import styles from './styles'

class Button extends React.Component {
  state = {
    highlightAnimation: new Animated.Value(0),
  }
  constructor(props) {
    super(props)
    this.isPressed = false
    this.onPressIn = this.onPressIn.bind(this)
    this.onPressOut = this.onPressOut.bind(this)
  }
  onPressIn() {
    const { isDisabled } = this.props
    if (isDisabled) {
      return
    }
    this.isPressed = true
    Animated.timing(this.state.highlightAnimation).stop()
    Animated.timing(this.state.highlightAnimation, {
      duration: 20,
      toValue: 1,
    }).start()
  }
  onPressOut() {
    const { isDisabled } = this.props
    Animated.timing(this.state.highlightAnimation).stop()
    if (this.isPressed || isDisabled) {
      Animated.timing(this.state.highlightAnimation, {
        duration: 300,
        toValue: 0,
      }).start()
      this.isPressed = false
    }
    if (isDisabled) {
      return
    }
    if (!this.isPressed) {
      Animated.sequence([
        Animated.timing(this.state.highlightAnimation, {
          duration: 20,
          toValue: 1,
        }),
        Animated.timing(this.state.highlightAnimation, {
          duration: 300,
          toValue: 0,
        }),
      ]).start()
    }
    this.props.onPress()
  }
  render() {
    const { children, style } = this.props
    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        <View style={{ ...styles.button, ...style }}>
          <Animated.View
            style={{
              ...styles.highlight,
              opacity: this.state.highlightAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            }}
          />
          {children}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Button
