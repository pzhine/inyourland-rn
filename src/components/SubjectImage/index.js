import React from 'react'
import { View } from 'react-native'
import defaultStyles from './styles'

const SubjectImage = ({ style, children, isActive }) => {
  const image = React.cloneElement(React.Children.only(children), {
    style: defaultStyles.image,
  })
  const shadowImage = React.cloneElement(image, {
    style: defaultStyles.shadowImage,
    blurRadius: 13,
  })
  return (
    <View
      style={{
        ...style,
        ...defaultStyles.container,
        ...(isActive ? defaultStyles.active : {}),
      }}
    >
      {shadowImage}
      {image}
    </View>
  )
}

export default SubjectImage
