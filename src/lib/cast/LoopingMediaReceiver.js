import { Application, MediaController } from 'castv2-client'
import config from '../../../config.json'

class LoopingMediaReceiver extends Application {
  constructor(...args) {
    super(...args)
    console.log('👍\tMEDIACONTROLLER')
    this.media = this.createController(MediaController)
    this.media.on('status', status => {
      console.log('ℹ️\tONSTATUS', status)
      this.emit('status', status)
    })
  }
  getStatus(...args) {
    this.media.getStatus(...args)
  }
  load(...args) {
    this.media.load(...args)
  }
  play(...args) {
    this.media.play(...args)
  }
}
LoopingMediaReceiver.APP_ID = config.receiverAppId

export default LoopingMediaReceiver
