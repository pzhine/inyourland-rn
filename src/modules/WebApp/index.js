import React from 'react'
import { Provider } from 'react-redux'
import store from '../../redux/configureStore'
import styles from './styles.scss'

const WebApp = () => (
  <Provider store={store}>
    <div style={styles}>Hello world</div>
  </Provider>
)

export default WebApp
