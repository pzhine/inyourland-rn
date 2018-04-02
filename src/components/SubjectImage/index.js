import React from 'react'
import { Animated } from 'react-native'
import styles from './styles'
import Gestures from './gestures'

const SubjectImage = ({
  style,
  children,
  activeAnimation,
  hideOnActive,
  onPress,
}) => {
  const imageStyles = styles.image
  const styledChildren = React.Children.map(
    children,
    (child, idx) =>
      child &&
      React.cloneElement(child, {
        style: {
          ...child.props.style,
          ...(idx === 0 ? { ...styles.shadowImage } : { ...imageStyles }),
        },
      })
  )
  const viewStyle = {
    ...style,
    ...styles.container,
    ...(activeAnimation && hideOnActive
      ? {
          opacity: activeAnimation.interpolate({
            inputRange: [0, 0.2],
            outputRange: [1, 0],
          }),
        }
      : {}),
    ...(activeAnimation && !hideOnActive
      ? {
          transform: [
            {
              translateY: activeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -300],
              }),
            },
          ],
        }
      : {}),
  }
  if (onPress) {
    return (
      <Animated.View style={viewStyle}>
        <Gestures onPress={onPress}>{styledChildren}</Gestures>
      </Animated.View>
    )
  }
  return <Animated.View style={viewStyle}>{styledChildren}</Animated.View>
}

export default SubjectImage
