import React, { Component } from 'react'
import { Image, View, Animated } from 'react-native'
import styles from './styles'
import SubjectImage from '../SubjectImage'
import getImageUrl from '../../lib/scene/getImageUrl'
import range from '../../lib/range'
import absmod from '../../lib/absmod'
import transitionProps from '../../hoc/transitionProps'
import subjectImageStyles from '../SubjectImage/styles'
import { mixins, variables } from '../../shared-styles'
import subjects from '../../../content/subjects.json'

const TRANSITION_DURATION = variables.transitions.currentIndex.duration
const SHADOW_SCALE = 1.4

const Slides = ({ slideRange, scenes, activeIndex, scale, blur }) =>
  slideRange.map(index => (
    <View
      style={{
        ...styles.slide,
        transform: [{ scaleX: scale }, { scaleY: scale }],
      }}
      key={index}
    >
      <SubjectImage isActive={absmod(index, scenes.length) === activeIndex}>
        <Image
          source={{
            uri: getImageUrl(
              scenes[absmod(index, scenes.length)].thumbFilename,
              { blur }
            ),
          }}
        />
      </SubjectImage>
    </View>
  ))

class Carousel extends Component {
  state = {
    slideAnimation: new Animated.Value(0),
    infoAnimation: new Animated.Value(1),
  }
  onChangeIndex(index) {
    console.log('INDEX_CHANGED', index)
  }
  componentWillReceiveProps(nextProps) {
    const { currentIndex, transitions } = nextProps
    // calculate transition properties
    if (transitions.currentIndex.becameActiveSince(this.props.transitions)) {
      const { nextValue } = transitions.currentIndex
      const slideCoefficient = nextValue > currentIndex ? -1 : 1
      console.log('TRANSITION', currentIndex, nextValue)
      Animated.timing(this.state.slideAnimation, {
        toValue:
          (styles.slide.marginLeft + subjectImageStyles.image.width + 5) *
          slideCoefficient,
        duration: TRANSITION_DURATION - 50,
        useNativeDriver: true,
      }).start()
      Animated.timing(this.state.infoAnimation, {
        toValue: 0,
        duration: TRANSITION_DURATION,
        useNativeDriver: true,
      }).start()
    }
    if (this.props.currentIndex !== nextProps.currentIndex) {
      this.setState({ slideAnimation: new Animated.Value(0) })
      this.elem.setNativeProps({ style: { transform: [{ translateX: 0 }] } })
      Animated.timing(this.state.infoAnimation, {
        toValue: 1,
        duration: TRANSITION_DURATION,
        useNativeDriver: true,
      }).start()
    }
  }
  render() {
    const { activeIndex, currentIndex, scenes } = this.props

    const slideRange = range(currentIndex - 3, currentIndex + 3)
    const stripWidth =
      (subjectImageStyles.image.width +
        subjectImageStyles.image.marginLeft * 2) *
      slideRange.length *
      SHADOW_SCALE
    return (
      <React.Fragment>
        <Animated.View
          ref={elem => (this.elem = elem)}
          style={{
            ...styles.carousel,
            alignItems: 'center',
            width: stripWidth,
            transform: [
              {
                translateX: this.state.slideAnimation,
              },
            ],
          }}
        >
          <View style={styles.blurLayer}>
            <Slides
              slideRange={slideRange}
              scenes={scenes}
              activeIndex={activeIndex}
              scale={SHADOW_SCALE}
              blur
            />
          </View>
          <Slides
            slideRange={slideRange}
            scenes={scenes}
            activeIndex={activeIndex}
            scale={1}
          />
        </Animated.View>
        <Animated.Text
          style={{
            ...mixins.titleText,
            ...styles.title,
            opacity: this.state.infoAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }}
        >
          {subjects
            .find(
              s =>
                s.subjectId ===
                scenes[absmod(currentIndex, scenes.length)].subjectId
            )
            .name.toUpperCase()}
        </Animated.Text>
      </React.Fragment>
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
