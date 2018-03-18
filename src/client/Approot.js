import React from 'react'
import { NativeRouter } from 'react-router-native'
import { Provider } from 'react-redux'
import Slideshow from '../modules/Slideshow'
import store from '../redux/configureStore'

const Approot = () => (
  <Provider store={store}>
    <NativeRouter>
      <Slideshow />
    </NativeRouter>
  </Provider>
)

export default Approot
