import React from 'react'
import { Animated, Image, Text } from 'react-native'
import Button from '../Button'
import styles from './styles'

const NavControls = ({
  locationIsTransitioning,
  onNext,
  onPrevious,
  onDetails,
}) => (
  <Animated.View style={styles.navControls}>
    <Button
      style={styles.prevButton}
      debounceWait={700}
      isDisabled={locationIsTransitioning}
      onPress={onPrevious || (() => console.log('previous button pressed'))}
    >
      <Image
        style={styles.prevArrow}
        source={require('../../../assets/arrow-narrow.png')}
      />
    </Button>
    <Button
      style={styles.detailsButton}
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
      debounceWait={700}
      isDisabled={locationIsTransitioning}
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
