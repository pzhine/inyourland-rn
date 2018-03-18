import React from 'react'
import { Provider } from 'react-redux'
import { View } from 'react-native'
import { NativeRouter } from 'react-router-native'
import scenes from '../../../content/scenes/stream0.json'
import store from '../../redux/configureStore'
import styles from './styles'

import BaseRoute from '../../screens/Base/route'
import NavigatorRoute from '../../screens/Navigator/route'
import SubjectRoute from '../../screens/Subject/route'

import SceneTransition from '../../transitions/SceneTransition'

const App = () => (
  <Provider store={store}>
    <NativeRouter>
      <View style={styles.container}>
        <SceneTransition scenes={scenes} currentSceneIndex={0}>
          <BaseRoute />
          <NavigatorRoute />
          <SubjectRoute />
        </SceneTransition>
      </View>
    </NativeRouter>
  </Provider>
)

export default App
