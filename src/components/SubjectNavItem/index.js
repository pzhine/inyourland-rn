import React from 'react'
import { Animated } from 'react-native'
import { withRouter } from 'react-router-native'
import RouteTransition from '../../transitions/RouteTransition'
import Button from '../Button'
import styles from './styles'
import { variables } from '../../shared-styles'
import bioSections from '../../../content/bioSections.json'

const transitionStyle = ({
  animations,
  isActive,
  isActiveNext,
  isVisibleOnActive,
}) => {
  if (!isActive && !isActiveNext) {
    return { opacity: isVisibleOnActive ? 0 : 1 }
  }
  return {
    opacity: animations.fade.interpolate({
      inputRange: [0, 1],
      outputRange:
        (isActive && isVisibleOnActive) || (isActiveNext && !isVisibleOnActive)
          ? [0, 1]
          : [1, 0],
    }),
  }
}

const SubjectNavItem = ({ section, history }) => (
  <RouteTransition
    holdDuration={variables.transitions.fadeRoute.duration}
    animations={{
      fade: {
        range: [0, 1],
        method: Animated.timing,
        duration: variables.transitions.fadeRoute.duration,
        oneWay: true,
      },
    }}
  >
    {({ animations, match, nextMatch, isTransitioning }) => {
      const isActive = section.sectionId === match.params.section
      const isActiveNext =
        nextMatch && section.sectionId === nextMatch.params.section
      const sectionTitle = bioSections.find(
        s => s.sectionId === section.sectionId
      ).title
      return (
        <Button
          isDisabled={isActive || isTransitioning}
          onPress={() => history.push(section.sectionId)}
          style={styles.button}
        >
          <Animated.Text
            style={{
              ...styles.text,
              ...transitionStyle({ animations, isActive, isActiveNext }),
            }}
          >
            {sectionTitle.toUpperCase()}
          </Animated.Text>
          <Animated.Text
            style={{
              ...styles.text,
              ...styles.active,
              ...transitionStyle({
                animations,
                isActive,
                isActiveNext,
                isVisibleOnActive: true,
              }),
            }}
          >
            {sectionTitle.toUpperCase()}
          </Animated.Text>
        </Button>
      )
    }}
  </RouteTransition>
)

export default withRouter(SubjectNavItem)
