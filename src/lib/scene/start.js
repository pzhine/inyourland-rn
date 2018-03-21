import setTimer from './setTimer'
import { getReceivers, playMedia } from '../cast'

async function start({ io, mediaList }) {
  console.log('scene startup')
  // scan the network for chromecast devices and start playing media
  await getReceivers(mediaList)
  await Promise.all(
    mediaList.map(async mediaEntry => {
      await playMedia(mediaEntry)
    })
  )

  // start scene timers
  mediaList.forEach(mediaEntry => {
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
