/* eslint-disable global-require */
import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { getStorybookUI, configure } from '@storybook/react-native'

console.disableYellowBox = true

// automatically import all files ending in *.stories.js
const req = require.context('../src/components/Map', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUIRoot = getStorybookUI({ port: 7007, onDeviceUI: true })

// react-native hot module loader must take in a Class - https://github.com/facebook/react-native/issues/10991
// https://github.com/storybooks/storybook/issues/2081
// eslint-disable-next-line react/prefer-stateless-function
class StorybookUIHMRRoot extends Component {
  render() {
    return <StorybookUIRoot />
  }
}

AppRegistry.registerComponent('inyourland-rn', () => StorybookUIHMRRoot)
export default StorybookUIHMRRoot
