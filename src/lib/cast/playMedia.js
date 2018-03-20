import { Client } from 'castv2-client'
import LoopingMediaReceiver from './LoopingMediaReceiver'
import config from '../../../config.json'

// attempts to play file defined in media.sourceFilename on chromecast
//   with host address in media.host (set by lib/cast/getReceivers)
// return a promise that resolves when the chromecast state becomes 'PLAYING'
// promise resolves with media object with the following properties added:
//   * duration: the duration of the clip
//   * player: a reference to the LoopingMediaReceiver instance
function playMedia(media) {
  console.log('playMedia', media)
  const client = new Client()

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('playMedia timed out'), media),
      config.castPlayTimeout * 1000
    )
    client.on('error', err => {
      client.close()
      reject(err)
    })
    client.connect(media.host, () => {
      console.log('connected, launching app ...')

      client.launch(LoopingMediaReceiver, (err, player) => {
        if (err) {
          reject(err)
        }

        media.player = player

        const mediaSpec = {
          contentId: config.mediaBaseUrl + media.sourceFilename,
          contentType: 'video/mp4',
          streamType: 'BUFFERED', // or LIVE
        }

        player.on('status', status => {
          console.log('status broadcast playerState=%s', status.playerState)
          if (status.media) {
            media.duration = status.media.duration
          }
          if (status.playerState === 'PLAYING') {
            clearTimeout(timeout)
            resolve(media)
          }
        })

        console.log(
          'app "%s" launched, loading media %s',
          player.session.displayName,
          mediaSpec.contentId
        )

        player.load(mediaSpec, { autoplay: true }, (err2, status) => {
          if (err2) {
            reject(err2)
          }
          console.log('media loaded playerState=%s', status.playerState)
        })
      })
    })
  })
}

export default playMedia
