import React from 'react'
import { View, Animated, Image } from 'react-native'
import { withRouter } from 'react-router-native'
import styles from './styles'
import { mixins, variables } from '../../shared-styles'
import RouteTransition from '../../transitions/RouteTransition'
import SubjectNavItem from '../../components/SubjectNavItem'
import Button from '../../components/Button'

const Content = ({ subject }) => (
  <RouteTransition
    holdDuration={variables.transitions.fadeRoute.duration}
    animations={{
      fade: {
        range: [0, 1],
        matchPath: '/subject/:subjectId/:sectionId',
        method: Animated.timing,
        duration: variables.transitions.fadeRoute.duration,
      },
    }}
  >
    {({ animations, match }) => {
      const section = subject.bio.find(
        s => s.sectionId === match.params.sectionId
      )
      return section ? (
        <Animated.Text
          style={{
            ...mixins.paragraphText,
            ...styles.content,
            opacity: animations.fade,
          }}
        >
          {section.content}
        </Animated.Text>
      ) : null
    }}
  </RouteTransition>
)

const Subject = ({ subject, history }) => (
  <View style={styles.subject}>
    <Button style={styles.backButton} onPress={() => history.goBack()}>
      <Image
        style={styles.backArrow}
        source={require('../../../assets/arrow.png')}
      />
    </Button>
    <Content subject={subject} />
    <View style={styles.nav}>
      {subject.bio.map(s => <SubjectNavItem section={s} key={s.sectionId} />)}
    </View>
  </View>
)

export default withRouter(Subject)
