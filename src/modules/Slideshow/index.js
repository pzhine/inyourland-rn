import React from 'react'
import { View, StatusBar } from 'react-native'
import { withRouter } from 'react-router-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styles from './styles'

import BaseRoute from './screens/Base/route'
import NavigatorRoute from './screens/Navigator/route'
import SubjectRoute from './screens/Subject/route'

import SceneTransition from '../../transitions/SceneTransition'

const Slideshow = ({ currentSceneIndex, scenes }) => (
  <View style={styles.container}>
    <StatusBar hidden />
    <SceneTransition scenes={scenes} currentSceneIndex={currentSceneIndex}>
      <BaseRoute />
      <NavigatorRoute />
      <SubjectRoute />
    </SceneTransition>
  </View>
)

export default compose(
  withRouter,
  connect(state => ({
    currentSceneIndex: state.scene.currentSceneIndex,
  }))
)(Slideshow)
