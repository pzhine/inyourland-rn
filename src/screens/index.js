import React from 'react'
import SceneTransition from '../transitions/SceneTransition'

import BaseRoute from './Base/route'
import NavigatorRoute from './Navigator/route'

const Screens = ({ scenes, currentSceneIndex }) => (
  <SceneTransition scenes={scenes} currentSceneIndex={currentSceneIndex}>
    <BaseRoute />
    <NavigatorRoute />
  </SceneTransition>
)

export default Screens
