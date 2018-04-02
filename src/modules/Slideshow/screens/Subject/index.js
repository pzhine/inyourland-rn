import React from 'react'
import { View, Animated, Image, Text } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-native'
import styles from './styles'
import { mixins } from '../../../../shared-styles'
import SubjectNavItem from '../../../../components/SubjectNavItem'
import Button from '../../../../components/Button'
import actions from '../../../../redux/scene/actions'

const Content = ({ subject, sectionId, animations }) => {
  const section = subject.bio.find(s => s.sectionId === sectionId)
  return section ? (
    <Animated.View
      style={{
        ...styles.content,
        opacity: animations.sectionAnimation,
      }}
    >
      <Text style={mixins.paragraphText}>{section.content}</Text>
      <Text style={styles.source}>Source: {section.source}</Text>
    </Animated.View>
  ) : null
}

const Subject = ({
  subject,
  history,
  isInteracting,
  startInteraction,
  ignoreInteracting,
  ...props
}) => (
  <View style={styles.subject}>
    {!isInteracting && !ignoreInteracting && <Redirect to="/" />}
    <Button
      style={styles.backButton}
      onPress={() => {
        startInteraction()
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
      {subject.bio.map(s => (
        <SubjectNavItem
          section={s}
          key={s.sectionId}
          onNav={startInteraction}
        />
      ))}
    </View>
  </View>
)

export default compose(
  connect(state => ({ isInteracting: state.scene.isInteracting }), actions),
  withRouter
)(Subject)
