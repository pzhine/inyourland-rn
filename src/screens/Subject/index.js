import React from 'react'
import { View, Animated, Image } from 'react-native'
import { Route } from 'react-router-native'
import styles from './styles'
import { mixins, variables } from '../../shared-styles'
import subjects from '../../../content/subjects.json'

import RouteTransition from '../../transitions/RouteTransition'
import SubjectNavItem from '../../components/SubjectNavItem'
import Button from '../../components/Button'

const Content = ({ subject }) => (
  <RouteTransition
    holdDuration={variables.transitions.fadeRoute.duration}
    animations={{
      fade: {
        range: [0, 1],
        method: Animated.timing,
        duration: variables.transitions.fadeRoute.duration,
      },
    }}
  >
    {({ animations, match }) => {
      const section = subject.bio.find(
        s => s.sectionId === match.params.section
      )
      return (
        <Animated.Text
          style={{
            ...mixins.paragraphText,
            ...styles.content,
            opacity: animations.fade,
          }}
        >
          {section.content}
        </Animated.Text>
      )
    }}
  </RouteTransition>
)

const Subject = () => (
  <Route
    path="/subject/:index/:section"
    render={({ match, history }) => {
      const subject = subjects[match.params.index]
      return (
        <View style={styles.subject}>
          <Button style={styles.backButton} onPress={() => history.push('/')}>
            <Image
              style={styles.backArrow}
              source={require('../../../assets/arrow.png')}
            />
          </Button>
          <Content subject={subject} />
          <View style={styles.nav}>
            {subject.bio.map(s => (
              <SubjectNavItem section={s} key={s.sectionId} />
            ))}
          </View>
        </View>
      )
    }}
  />
)

export default Subject
