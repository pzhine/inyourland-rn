import React from 'react'
import { Animated } from 'react-native'
import styles from './styles'

const SubjectImage = ({ style, children, activeAnimation }) => {
  const child = React.Children.only(children)
  const image = React.cloneElement(child, {
    style: { ...child.props.style, ...styles.image },
  })
  return (
    <Animated.View
      style={{
        ...style,
        ...styles.container,
        ...(activeAnimation
          ? {
              transform: [
                {
                  translateY: activeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -350],
                  }),
                },
              ],
            }
          : {}),
      }}
    >
      {image}
    </Animated.View>
  )
}

export default SubjectImage
