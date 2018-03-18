import React from 'react'
import { Animated, Image, Text } from 'react-native'
import Button from '../Button'
import styles from './styles'

const NavControls = ({
  isTransitioning,
  animations,
  onNext,
  onPrevious,
  onDetails,
}) => (
  <Animated.View
    style={{
      ...styles.navControls,
      opacity: animations.locationInfo.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
      }),
    }}
  >
    <Button
      style={styles.prevButton}
      isDisabled={isTransitioning}
      onPress={onPrevious || (() => console.log('previous button pressed'))}
    >
      <Image
        style={styles.prevArrow}
        source={require('../../../assets/arrow-narrow.png')}
      />
    </Button>
    <Button
      style={styles.detailsButton}
      isDisabled={isTransitioning}
      onPress={
        onDetails ||
        (() => {
          console.log('details button pressed')
        })
      }
    >
      <Text style={styles.detailsButtonText}>Discover</Text>
    </Button>
    <Button
      style={styles.prevButton}
      isDisabled={isTransitioning}
      onPress={onNext || (() => console.log('next button pressed'))}
    >
      <Image
        style={styles.nextArrow}
        source={require('../../../assets/arrow-narrow.png')}
      />
    </Button>
  </Animated.View>
)

export default NavControls
