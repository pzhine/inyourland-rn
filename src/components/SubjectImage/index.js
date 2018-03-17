import React from 'react'
import { Animated } from 'react-native'
import styles from './styles'

const SubjectImage = ({ style, children, activeAnimation, hideOnActive }) => {
  const styledChildren = React.Children.map(
    children,
    (child, idx) =>
      child &&
      React.cloneElement(child, {
        style: {
          ...child.props.style,
          ...(idx === 0 ? { ...styles.shadowImage } : { ...styles.image }),
        },
      })
  )
  return (
    <Animated.View
      style={{
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
                    outputRange: [0, -320],
                  }),
                },
              ],
            }
          : {}),
      }}
    >
      {styledChildren}
    </Animated.View>
  )
}

export default SubjectImage
