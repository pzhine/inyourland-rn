import React from 'react'
import { Animated } from 'react-native'
import { withRouter } from 'react-router-native'
import RouteTransition from '../../transitions/RouteTransition'
import Button from '../Button'
import styles from './styles'
import { variables } from '../../shared-styles'
import bioSections from '../../../content/bioSections.json'

const SubjectNavItem = ({ section, history }) => (
  <RouteTransition
    holdDuration={variables.transitions.fadeRoute.duration}
    animations={{
      showActive: {
        range: [0, 1],
        method: Animated.timing,
        duration: variables.transitions.fadeRoute.duration,
        isIn: nextMatch => nextMatch.params.section === section.sectionId,
      },
      showInactive: {
        range: [0, 1],
        method: Animated.timing,
        duration: variables.transitions.fadeRoute.duration,
        isIn: nextMatch => nextMatch.params.section !== section.sectionId,
      },
    }}
  >
    {({ animations, match, nextMatch, isTransitioning }) => {
      console.log('subjectnavitem.render', match, nextMatch)
      const isActive = section.sectionId === match.params.section
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
              opacity: animations.showInactive,
            }}
          >
            {sectionTitle.toUpperCase()}
          </Animated.Text>
          <Animated.Text
            style={{
              ...styles.text,
              ...styles.active,
              opacity: animations.showActive,
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
