import React, { Component } from 'react'
import { View, Animated } from 'react-native'
import styles from './styles'
import SubjectImage from '../SubjectImage'
import getImageUrl from '../../lib/scene/getImageUrl'
import range from '../../lib/range'
import absmod from '../../lib/absmod'
import transitionProps from '../../hoc/transitionProps'
import subjectImageStyles from '../SubjectImage/styles'
import { mixins } from '../../shared-styles'
import subjects from '../../../content/subjects.json'

const TRANSITION_DURATION = 400
const SHADOW_SCALE = 1.4

const Slides = ({
  slideRange,
  scenes,
  scale,
  blur,
  activeAnimation,
  inactiveAnimation,
}) => {
  const middleIndex = Math.ceil(slideRange / 2)
  return slideRange.map(index => (
    <View
      style={{
        ...styles.slide,
        transform: [{ scaleX: scale }, { scaleY: scale }],
      }}
      key={index}
    >
      <SubjectImage activeAnimation={index === middleIndex && activeAnimation}>
        <Animated.Image
          source={{
            uri: getImageUrl(
              scenes[absmod(index, scenes.length)].thumbFilename,
              { blur }
            ),
          }}
          style={{ opacity: inactiveAnimation }}
        />
      </SubjectImage>
    </View>
  ))
}

class Carousel extends Component {
  state = {
    slideAnimation: new Animated.Value(0),
    infoAnimation: new Animated.Value(1),
  }
  onChangeIndex(index) {
    console.log('INDEX_CHANGED', index)
  }
  componentWillReceiveProps(nextProps) {
    const { currentSceneIndex, transitions } = nextProps
    // calculate transition properties
    if (
      transitions.currentSceneIndex.becameActiveSince(this.props.transitions)
    ) {
      const { nextValue } = transitions.currentSceneIndex
      const slideCoefficient = nextValue > currentSceneIndex ? -1 : 1
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
    if (this.props.currentSceneIndex !== nextProps.currentSceneIndex) {
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
    const { currentSceneIndex, scenes, routeAnimations } = this.props

    const slideRange = range(currentSceneIndex - 3, currentSceneIndex + 3)
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
              activeAnimation={routeAnimations.showActive}
              inactiveAnimation={routeAnimations.hideInactive}
              scale={SHADOW_SCALE}
              blur
            />
          </View>
          <Slides
            slideRange={slideRange}
            scenes={scenes}
            activeAnimation={routeAnimations.showActive}
            inactiveAnimation={routeAnimations.hideInactive}
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
                scenes[absmod(currentSceneIndex, scenes.length)].subjectId
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
    currentSceneIndex: {
      duration: TRANSITION_DURATION,
      compare: ({ pre, post }) => pre === post,
    },
  }),
})(Carousel)
