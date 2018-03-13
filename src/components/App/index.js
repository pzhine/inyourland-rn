import React from 'react'
import { Provider } from 'react-redux'
import { Text, View } from 'react-native'
import store from '../../redux/configureStore'
import styles from './styles'

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <Text style={styles.lightText}>Light Text Testing</Text>
      <Text style={styles.mediumText}>Medium Text Testing</Text>
      <Text style={styles.heavyText}>Heavy Text Testing</Text>
    </View>
  </Provider>
)

export default App
