import React from 'react'
import { View, Image, Animated, Easing } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import Carousel from './'
import scenes from '../../../content/scenes/stream0.json'
import AutoPlay from '../../../storybook/AutoPlay'
import storyStyles from '../../../storybook/styles'
import getImageUrl from '../../lib/scene/getImageUrl'
import PropTransition from '../../transitions/PropTransition'

const Transition = ({ children, toggle }) => (
  <PropTransition
    holdDuration={1000}
    toggle={toggle}
    propToWatch="toggle"
    animations={{
      activeAnimation: {
        isIn: val => val % 2,
        range: [0, 1],
        method: Animated.spring,
        friction: 170,
        tension: 5,
        inDelay: 300,
        outDelay: 300,
      },
      activeFollowAnimation: {
        isIn: val => val % 2,
        range: [0, 1],
        method: Animated.timing,
        duration: 1000,
        easing: Easing.inOut(Easing.sin),
        inDelay: 300,
      },
      inactiveAnimation: {
        isIn: val => !(val % 2),
        range: [0, 1],
        method: Animated.timing,
        duration: 1000,
      },
    }}
  >
    {children}
  </PropTransition>
)

storiesOf('components/Carousel', module)
  .addDecorator(story => (
    <View style={storyStyles.container}>
      <Image
        source={{ uri: getImageUrl('nyc', { map: true }) }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: 768,
          height: 1024,
        }}
      />
      {story()}
    </View>
  ))
  .add('default', () => (
    <Transition toggle={0}>
      <Carousel scenes={scenes} currentSceneIndex={0} />
    </Transition>
  ))
  .add('autoPlay forward', () => (
    <AutoPlay interval={1}>
      {currentIndex => (
        <Transition toggle={0}>
          <Carousel scenes={scenes} currentSceneIndex={currentIndex} />
        </Transition>
      )}
    </AutoPlay>
  ))
  .add('autoPlay reverse', () => (
    <AutoPlay interval={-1} propToIncrement="currentSceneIndex">
      {currentIndex => (
        <Transition toggle={0}>
          <Carousel scenes={scenes} currentSceneIndex={currentIndex} />
        </Transition>
      )}
    </AutoPlay>
  ))
  .add('transition to subject', () => (
    <AutoPlay interval={1} propToIncrement="toggle">
      <Transition>
        <Carousel scenes={scenes} currentSceneIndex={0} />
      </Transition>
    </AutoPlay>
  ))
