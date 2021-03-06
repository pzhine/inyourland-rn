import { Client } from 'castv2-client'
import LoopingMediaReceiver from './LoopingMediaReceiver'
import config from '../../../config.json'

// attempts to play file defined in mediaEntry.sourceFilename on chromecast
//   with host address in mediaEntry.host (set by lib/cast/getReceivers)
// return a promise that resolves when the chromecast state becomes 'PLAYING'
// the following properties of mediaEntry will be added/mutated:
//   * duration: the duration of the clip
//   * player: a reference to the LoopingMediaReceiver instance
function playMedia(mediaEntry) {
  console.log('playMedia', mediaEntry)
  const client = new Client()

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('playMedia timed out'), mediaEntry),
      config.castPlayTimeout * 1000
    )
    client.on('error', err => {
      console.log('❌  playMedia client error', JSON.stringify(err, null, 2))
      client.close()
      reject(err)
    })
    client.connect(mediaEntry.host, () => {
      console.log('connected, launching app ...')

      client.launch(LoopingMediaReceiver, (err, player) => {
        if (err) {
          console.log(
            '❌  playMedia launch error',
            JSON.stringify(err, null, 2)
          )
          reject(err)
          return
        }

        client.setVolume({ level: mediaEntry.volume }, (err2, response) => {
          if (err2) {
            console.log(
              '❌  playMedia setVolume error',
              JSON.stringify(err2, null, 2)
            )
          }
          console.log('🔈  playMedia setVolume', response)
        })

        mediaEntry.player = player

        const mediaSpec = {
          contentId: config.mediaBaseUrl + mediaEntry.sourceFilename,
          contentType: mediaEntry.contentType,
          streamType: 'BUFFERED', // or LIVE
          crossfadeWidth: mediaEntry.crossfadeWidth,
        }

        player.on('status', status => {
          console.log('status broadcast playerState=%s', status.playerState)
          if (status.media) {
            mediaEntry.duration = status.media.duration * 1000
            console.log(
              `🎦  ${mediaEntry.mediaId} duration`,
              mediaEntry.duration
            )
          }
          if (status.playerState === 'PLAYING') {
            clearTimeout(timeout)
            mediaEntry.isPlaying = true
            resolve()
          }
        })

        console.log(
          'app "%s" launched, loading media %s',
          player.session.displayName,
          mediaSpec.contentId
        )

        player.load(mediaSpec, { autoplay: true }, (err2, status) => {
          if (err2) {
            console.log(
              '❌  playMedia load error',
              JSON.stringify(err2, null, 2)
            )
            reject(err2)
            return
          }
          console.log('media loaded playerState=%s', status.playerState)
        })
      })
    })
  })
}

export default playMedia
