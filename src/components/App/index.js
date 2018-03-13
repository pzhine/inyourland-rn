import React from 'react'
import { Provider } from 'react-redux'
import { Text, View } from 'react-native'
import store from '../../redux/configureStore'
import styles from './styles'

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <Text style={styles.titleText}>TITLE FONT</Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Button Font</Text>
      </View>
      <Text style={styles.paragraphText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus
        diam non mattis dignissim. Donec dui neque, auctor quis aliquet nec,
        ultricies vitae mi. Duis a ex quis dui fringilla tincidunt. Vivamus et
        sem a nisl consequat efficitur a sed mauris. Donec pretium sollicitudin
        neque, id euismod tortor sollicitudin eu. Aenean vel blandit justo,
        aliquam rutrum dui.
      </Text>
    </View>
  </Provider>
)

export default App
