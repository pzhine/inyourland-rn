import getReceivers from '../lib/cast/getReceivers'
import playMedia from '../lib/cast/playMedia'
import mediaList from '../../content/media.json'

async function play() {
  try {
    await getReceivers(mediaList)
    await playMedia(mediaList[0])
  } catch (err) {
    console.log(err)
  }
}

play()
