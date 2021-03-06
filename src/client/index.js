import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './Webroot'

const root = document.querySelector('#root')

const mount = RootComponent => {
  render(
    <AppContainer>
      <RootComponent />
    </AppContainer>,
    root
  )
}

if (module.hot) {
  module.hot.accept('./Webroot', () => {
    // eslint-disable-next-line global-require,import/newline-after-import
    const RootComponent = require('./Webroot').default
    mount(RootComponent)
  })
}

mount(Root)
