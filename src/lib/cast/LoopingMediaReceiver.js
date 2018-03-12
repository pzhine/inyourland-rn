import { Application, MediaController } from 'castv2-client'

class LoopingMediaReceiver extends Application {
  constructor(...args) {
    super(...args)
    console.log('-----MEDIACONTROLLER', MediaController)
    this.media = this.createController(MediaController)
    this.media.on('status', status => {
      console.log('-----ONSTATUS', status)
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
LoopingMediaReceiver.APP_ID = 'D838C0D2'

export default LoopingMediaReceiver
