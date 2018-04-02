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
  onSlidePress,
}) => {
  const middleIndex = Math.floor(slideRange.length / 2)
  return slideRange.map((index, count) => {
    const sceneIndex = absmod(index, scenes.length)
    return (
      <View
        style={{
          ...styles.slide,
          transform: [{ scaleX: scale }, { scaleY: scale }],
        }}
        key={index}
      >
        <SubjectImage
          activeAnimation={count === middleIndex && activeAnimation}
          hideOnActive={blur}
          onPress={onSlidePress ? () => onSlidePress(sceneIndex) : null}
        >
          {!blur && (
            <Animated.Image
              source={{
                uri: getImageUrl(scenes[sceneIndex].thumbFilename, {
                  blur: true,
                }),
              }}
              style={{
                opacity:
                  count === middleIndex
                    ? activeAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0.7],
                      })
                    : 0,
              }}
            />
          )}
          <Animated.Image
            source={{
              uri: getImageUrl(scenes[sceneIndex].thumbFilename, { blur }),
            }}
            style={{
              ...styles.image,
              opacity: count === middleIndex ? 1 : inactiveAnimation,
            }}
          />
        </SubjectImage>
      </View>
    )
  })
}

const sceneIndexDelta = (current, next) => Math.abs(next - current)

class Carousel extends Component {
  state = {
    slideAnimation: new Animated.Value(0),
    infoAnimation: new Animated.Value(1),
    resyncAnimation: new Animated.Value(1),
  }
  componentWillReceiveProps(nextProps) {
    const { currentSceneIndex, transitions, scenes } = nextProps

    // calculate transition properties
    if (
      transitions.currentSceneIndex.becameActiveSince(this.props.transitions)
    ) {
      const { nextValue } = transitions.currentSceneIndex

      // start delta 1 animations
      if (sceneIndexDelta(currentSceneIndex, nextValue, scenes.length) === 1) {
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
      } else {
        // or start resync animation
        Animated.timing(this.state.resyncAnimation, {
          toValue: 0,
          duration: TRANSITION_DURATION,
          useNativeDriver: true,
        }).start()
      }
    }

    // when the transition is complete, reset delta 1 animations
    if (this.props.currentSceneIndex !== nextProps.currentSceneIndex) {
      if (
        sceneIndexDelta(
          this.props.currentSceneIndex,
          nextProps.currentSceneIndex,
          scenes.length
        ) === 1
      ) {
        this.setState({ slideAnimation: new Animated.Value(0) })
        this.elem.setNativeProps({ style: { transform: [{ translateX: 0 }] } })
        Animated.timing(this.state.infoAnimation, {
          toValue: 1,
          duration: TRANSITION_DURATION,
          useNativeDriver: true,
        }).start()
      } else {
        // or reset resync animation
        Animated.timing(this.state.resyncAnimation, {
          toValue: 1,
          duration: TRANSITION_DURATION,
          useNativeDriver: true,
        }).start()
      }
    }
  }
  render() {
    const {
      currentSceneIndex,
      scenes,
      animations,
      onSlidePress,
      isTransitioningToSubject,
    } = this.props

    console.log('carousel.render', isTransitioningToSubject)

    const slideRange = range(currentSceneIndex - 3, currentSceneIndex + 3)
    const stripWidth =
      (subjectImageStyles.image.width +
        subjectImageStyles.image.marginLeft * 2) *
      slideRange.length *
      SHADOW_SCALE
    return (
      <View style={styles.carousel}>
        <Animated.View
          ref={elem => (this.elem = elem)}
          style={{
            ...styles.slidesContainer,
            alignItems: 'center',
            width: stripWidth,
            opacity: this.state.resyncAnimation,
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
              activeAnimation={animations.activeAnimation}
              inactiveAnimation={animations.inactiveAnimation}
              scale={SHADOW_SCALE}
              blur
            />
          </View>
          <Slides
            slideRange={slideRange}
            scenes={scenes}
            activeAnimation={animations.activeAnimation}
            inactiveAnimation={animations.inactiveAnimation}
            scale={1}
            onSlidePress={onSlidePress}
          />
        </Animated.View>
        <Animated.Text
          style={{
            ...mixins.titleText,
            ...styles.title,
            opacity: Animated.add(
              this.state.infoAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              animations.activeFollowAnimation.interpolate({
                inputRange: [0, 0.2, 0.8, 1],
                outputRange: [isTransitioningToSubject ? -1 : 0, -1, -1, 0],
              })
            ),
            transform: [
              {
                translateY: animations.activeFollowAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -340],
                }),
              },
              {
                scale: animations.activeFollowAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.8],
                }),
              },
            ],
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
      </View>
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
