import { Client } from 'castv2-client'
import LoopingMediaReceiver from './LoopingMediaReceiver'
import config from '../../../config.json'

function playMedia(media) {
  console.log('playMedia', media)
  const client = new Client()

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject('playMedia timed out', media),
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
