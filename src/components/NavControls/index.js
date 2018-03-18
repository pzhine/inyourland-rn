import React from 'react'
import { Animated, Image, Text } from 'react-native'
import { withRouter } from 'react-router-native'
import Button from '../Button'
import styles from './styles'

const NavControls = ({
  isTransitioning,
  animations,
  history,
  scenes,
  currentSceneIndex,
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
      onPress={() => {
        console.log('prev')
      }}
    >
      <Image
        style={styles.prevArrow}
        source={require('../../../assets/arrow-narrow.png')}
      />
    </Button>
    <Button
      style={styles.detailsButton}
      isDisabled={isTransitioning}
      onPress={() => {
        history.push(`/subject/${scenes[currentSceneIndex].subjectId}/about`)
      }}
    >
      <Text style={styles.detailsButtonText}>Discover</Text>
    </Button>
    <Button
      style={styles.prevButton}
      isDisabled={isTransitioning}
      onPress={() => {
        console.log('next')
      }}
    >
      <Image
        style={styles.nextArrow}
        source={require('../../../assets/arrow-narrow.png')}
      />
    </Button>
  </Animated.View>
)

export default withRouter(NavControls)
