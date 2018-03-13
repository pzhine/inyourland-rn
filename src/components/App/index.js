import React from 'react'
import { Provider } from 'react-redux'
import { Text, View } from 'react-native'
import store from '../../redux/configureStore'
import styles from './styles'

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <Text style={styles.titleText}>In Your Land</Text>
    </View>
  </Provider>
)

export default App
