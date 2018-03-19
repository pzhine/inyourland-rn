import React from 'react'
import { TouchableWithoutFeedback, Animated, View } from 'react-native'
import _ from 'lodash'
import styles from './styles'

class Button extends React.Component {
  state = {
    highlightAnimation: new Animated.Value(0),
  }
  constructor(props) {
    super(props)
    const debounceWait = props.debounceWait || 250
    this.onPressIn = _.throttle(this.onPressIn.bind(this), debounceWait, {
      leading: true,
    })
    this.onPressOut = _.throttle(this.onPressOut.bind(this), debounceWait, {
      leading: true,
    })
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
    if (!isDisabled) {
      onPress()
    }
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
