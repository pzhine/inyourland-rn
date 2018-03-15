import React from 'react'
import { Animated, View, Text, TouchableHighlight } from 'react-native'
import { withRouter } from 'react-router-native'
import RouteTransition from '../../transitions/RouteTransition'
import styles from './styles'
import { variables } from '../../shared-styles'

const sectionPath = section => section.title.toLowerCase().replace(' ', '-')

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
  <View style={styles.subjectNavItem}>
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
        const isActive = sectionPath(section) === match.params.section
        const isActiveNext =
          nextMatch && sectionPath(section) === nextMatch.params.section
        return [
          <Animated.View
            style={transitionStyle({ animations, isActive, isActiveNext })}
            key={0}
          >
            <TouchableHighlight
              onPress={() => {
                if (!isTransitioning) {
                  history.push(sectionPath(section))
                }
              }}
              style={styles.button}
            >
              <Text style={styles.text}>{section.title.toUpperCase()}</Text>
            </TouchableHighlight>
          </Animated.View>,
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
            key={1}
          >
            {section.title.toUpperCase()}
          </Animated.Text>,
        ]
      }}
    </RouteTransition>
  </View>
)

export default withRouter(SubjectNavItem)
