import React from 'react'
import { Image, View } from 'react-native'
import defaultStyles from './styles'
import SubjectImage from '../SubjectImage'
import getImageUrl from '../../lib/scene/getImageUrl'
import range from '../../lib/range'
import absmod from '../../lib/absmod'
import transitionProps from '../../hoc/transitionProps'

const Slide = ({ scene, isActive }) => (
  <View style={defaultStyles.slide}>
    <SubjectImage isActive={isActive}>
      <Image source={{ uri: getImageUrl(scene.thumbFilename) }} />
    </SubjectImage>
  </View>
)

const Carousel = ({ activeIndex, currentIndex, scenes, transitions }) => {
  const onChangeIndex = index => {
    console.log('INDEX_CHANGED', index)
  }
  const slides = range(currentIndex - 3, currentIndex + 3)

  // calculate transition properties
  const tx = { amount: 0, isActive: false }
  if (transitions.currentIndex.isActive) {
    const { nextValue } = transitions.currentIndex
    const slideSign =
      nextValue > activeIndex ||
      (activeIndex === scenes.length - 1 && nextValue === 0)
        ? ''
        : '-'
    tx.isActive = true
    tx.amount = `${slideSign}${100 / scenes.length - 2.5}%`
    console.log('transition', tx)
  }

  return (
    <View style={defaultStyles.carousel}>
      {slides.map(index => (
        <Slide
          scene={scenes[absmod(index, scenes.length)]}
          key={index}
          isActive={absmod(index, scenes.length) === activeIndex}
        />
      ))}
    </View>
  )
}

export default transitionProps({
  propsToTransition: () => ({
    currentIndex: {
      duration: 500,
      compare: ({ pre, post }) => pre === post,
    },
  }),
})(Carousel)
