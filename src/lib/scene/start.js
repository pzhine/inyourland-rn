import timer from './timer'
// import { getReceivers, playMedia } from '../cast'
import media from '../../../content/media.json'

async function start({ io }) {
  console.log('scene startup')
  // const inputMedia = await getReceivers()
  // const outputMedia = []
  // await Promise.all(
  //   inputMedia.map(async mediaEntry => {
  //     outputMedia.push(await playMedia(mediaEntry))
  //   })
  // )
  const outputMedia = media

  outputMedia.forEach(m => {
    const scenes = require(`../../../content/scenes/${m.mediaId}.json`)
    timer({
      scenes,
      media: m,
      delay: scenes[1].startTime,
      sceneIndex: 1,
      io,
    })
  })
}

export default start
