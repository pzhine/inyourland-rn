import React from 'react'
import { Image, View, Animated } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import SubjectImage from './'
import storyStyles from '../../../storybook/styles'
import PropTransition from '../../transitions/PropTransition'
import AutoPlay from '../../../storybook/AutoPlay'

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
      },
    }}
  >
    {({ animations }) =>
      React.cloneElement(React.Children.only(children), {
        activeAnimation: animations.activeAnimation,
      })
    }
  </PropTransition>
)

storiesOf('components/SubjectImage', module)
  .addDecorator(story => <View style={storyStyles.container}>{story()}</View>)
  .add('default', () => (
    <SubjectImage>
      <Animated.Image source={{ uri: 'http://placebear.com/g/300/200.jpg' }} />
      <Image source={{ uri: 'http://placebear.com/300/200.jpg' }} />
    </SubjectImage>
  ))
  .add('active/inactive autoplay', () => (
    <AutoPlay propToIncrement="toggle" interval={1}>
      <Transition>
        <SubjectImage>
          <Animated.Image
            source={{ uri: 'http://placebear.com/g/300/200.jpg' }}
          />
          <Image source={{ uri: 'http://placebear.com/300/200.jpg' }} />
        </SubjectImage>
      </Transition>
    </AutoPlay>
  ))
  .add('with onPress', () => (
    <SubjectImage
      onPress={() => {
        console.log('pressed!')
      }}
    >
      <Animated.Image source={{ uri: 'http://placebear.com/g/300/200.jpg' }} />
      <Image source={{ uri: 'http://placebear.com/300/200.jpg' }} />
    </SubjectImage>
  ))
