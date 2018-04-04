import setTimer from './setTimer'
import { restartIfInactive } from '../cast'

async function start({ io, mediaList }) {
  console.log('scene startup')

  // start scene/status timers
  mediaList.forEach(mediaEntry => {
    // for audio streams, just check status
    if (mediaEntry.contentType.match('audio')) {
      setInterval(
        () =>
          restartIfInactive({
            mediaEntry,
            currentSceneIndex: 0,
            currentTime: 0,
          }),
        30000
      )
      return
    }
    // for video streams, set scene timers, which also check status
    const scenes = require(`../../../content/scenes/${mediaEntry.mediaId}.json`)
    setTimer({
      scenes,
      mediaEntry,
      io,
      currentSceneIndex: 0,
      loopCount: 0,
    })
  })
}

export default start
