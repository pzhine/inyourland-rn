import React from 'react'
import { View, Animated, Image } from 'react-native'
import { withRouter } from 'react-router-native'
import styles from './styles'
import { mixins } from '../../../../shared-styles'
import SubjectNavItem from '../../../../components/SubjectNavItem'
import Button from '../../../../components/Button'

const Content = ({ subject, sectionId, animations }) => {
  const section = subject.bio.find(s => s.sectionId === sectionId)
  return section ? (
    <Animated.Text
      style={{
        ...mixins.paragraphText,
        ...styles.content,
        opacity: animations.sectionAnimation,
      }}
    >
      {section.content}
    </Animated.Text>
  ) : null
}

const Subject = ({ subject, history, ...props }) => (
  <View style={styles.subject}>
    <Button
      style={styles.backButton}
      onPress={() => {
        history.push('/')
      }}
    >
      <Image
        style={styles.backArrow}
        source={require('../../../../../assets/arrow.png')}
      />
    </Button>
    <Content subject={subject} {...props} />
    <View style={styles.nav}>
      {subject.bio.map(s => <SubjectNavItem section={s} key={s.sectionId} />)}
    </View>
  </View>
)

export default withRouter(Subject)
