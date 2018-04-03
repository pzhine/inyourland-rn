import React from 'react'
import { NativeRouter } from 'react-router-native'
import { Provider } from 'react-redux'
import Slideshow from '../modules/Slideshow'
import store from '../redux/configureStore'
import mediaList from '../../content/media.json'
import getClientIp from '../lib/client/getClientIp'

class Approot extends React.Component {
  state = {
    scenes: null,
  }
  constructor(props) {
    super(props)
    this.getScenes()
  }
  getScenes() {
    getClientIp()
      .then(clientIp => {
        console.log('client IP', clientIp)
        const mediaId = mediaList.find(m => m.clientIp === clientIp).mediaId
        console.log('mediaId', mediaId)
        const scenes = require(`../../content/scenes/${mediaId}.json`)
        this.setState({ scenes })
      })
      .catch(err => {
        console.error(err)
      })
  }
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          {this.state.scenes && (
            <Slideshow scenes={this.state.scenes} currentSceneIndex={0} />
          )}
        </NativeRouter>
      </Provider>
    )
  }
}

export default Approot
