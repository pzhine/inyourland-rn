import React from 'react'
import { Animated, Image } from 'react-native'
import Button from '../Button'
import PropTransition from '../../transitions/PropTransition'
import getImageUrl from '../../lib/scene/getImageUrl'
import styles from './styles'

const CurrentSceneButton = ({ scene, onPress, isVisible }) => (
  <PropTransition
    holdDuration={400}
    propToWatch="isVisible"
    isVisible={isVisible}
    animations={{
      fadeAnimation: {
        isIn: val => val,
        range: [0, 1],
        method: Animated.timing,
        duration: 400,
      },
    }}
  >
    {({ animations }) => (
      <Animated.View
        style={{
          ...styles.currentSceneButton,
          opacity: animations.fadeAnimation,
        }}
      >
        <Button onPress={onPress} style={styles.button}>
          <Image
            style={styles.image}
            source={{
              uri: getImageUrl(scene.thumbFilename),
            }}
          />
        </Button>
      </Animated.View>
    )}
  </PropTransition>
)

export default CurrentSceneButton
