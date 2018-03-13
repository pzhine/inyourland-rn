import React, { Component } from 'react'
import { Image, View, Animated, Easing } from 'react-native'
import defaultStyles from './styles'
import SubjectImage from '../SubjectImage'
import getImageUrl from '../../lib/scene/getImageUrl'
import range from '../../lib/range'
import absmod from '../../lib/absmod'
import transitionProps from '../../hoc/transitionProps'
import subjectImageStyles from '../SubjectImage/styles'

const TRANSITION_DURATION = 400

const Slide = ({ scene, isActive }) => (
  <View style={defaultStyles.slide}>
    <SubjectImage isActive={isActive}>
      <Image source={{ uri: getImageUrl(scene.thumbFilename) }} />
    </SubjectImage>
  </View>
)

class Carousel extends Component {
  state = {
    slideTransition: new Animated.Value(0),
  }
  onChangeIndex(index) {
    console.log('INDEX_CHANGED', index)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.currentIndex !== nextProps.currentIndex) {
      this.setState({ slideTransition: new Animated.Value(0) })
      this.elem.setNativeProps({ style: { transform: [{ translateX: 0 }] } })
    }
  }
  render() {
    const { activeIndex, currentIndex, scenes, transitions } = this.props

    // calculate transition properties
    if (transitions.currentIndex.isActive) {
      const { nextValue } = transitions.currentIndex
      const slideCoefficient = nextValue > currentIndex ? -1 : 1
      console.log('TRANSITION', currentIndex, nextValue)
      Animated.timing(this.state.slideTransition, {
        toValue:
          (defaultStyles.slide.marginLeft + subjectImageStyles.image.width) *
          slideCoefficient,
        duration: TRANSITION_DURATION,
        useNativeDriver: true,
      }).start()
    }

    const slides = range(currentIndex - 3, currentIndex + 3)
    return (
      <Animated.View
        ref={elem => (this.elem = elem)}
        style={{
          ...defaultStyles.carousel,
          transform: [
            {
              translateX: this.state.slideTransition,
            },
          ],
        }}
      >
        {slides.map(index => (
          <Slide
            scene={scenes[absmod(index, scenes.length)]}
            key={index}
            isActive={absmod(index, scenes.length) === activeIndex}
          />
        ))}
      </Animated.View>
    )
  }
}

// export default Carousel
export default transitionProps({
  propsToTransition: () => ({
    currentIndex: {
      duration: TRANSITION_DURATION,
      compare: ({ pre, post }) => pre === post,
    },
  }),
})(Carousel)
