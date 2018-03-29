import React from 'react'
import { Animated } from 'react-native'
import Button from '../Button'
import styles from './styles'

const SubjectImage = ({
  style,
  children,
  activeAnimation,
  hideOnActive,
  onPress,
}) => {
  const imageStyles = onPress ? styles.dims : styles.image
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
  return onPress ? (
    <Animated.View style={viewStyle}>
      {styledChildren[0]}
      <Button style={styles.image} onPress={onPress}>
        {styledChildren[1]}
      </Button>
    </Animated.View>
  ) : (
    <Animated.View style={viewStyle}>{styledChildren}</Animated.View>
  )
}

export default SubjectImage
