import React from 'react'
import { TouchableWithoutFeedback, Animated, View } from 'react-native'
import styles from './styles'

class Button extends React.Component {
  state = {
    highlightAnimation: new Animated.Value(0),
  }
  onPressIn() {
    const { isDisabled } = this.props
    if (isDisabled) {
      return
    }
    Animated.timing(this.state.highlightAnimation, {
      duration: 20,
      toValue: 1,
    }).start()
  }
  onPressOut() {
    const { isDisabled, onPress } = this.props
    if (isDisabled) {
      return
    }
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
    onPress()
  }
  render() {
    const { children, style } = this.props
    return (
      <TouchableWithoutFeedback
        onPressIn={() => this.onPressIn()}
        onPressOut={() => this.onPressOut()}
      >
        <View style={{ ...styles.button, ...style }}>
          <Animated.View
            style={{
              ...styles.highlight,
              opacity: this.state.highlightAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.7],
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
