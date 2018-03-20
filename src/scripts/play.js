import getReceivers from '../lib/cast/getReceivers'
import playMedia from '../lib/cast/playMedia'

async function play() {
  try {
    const inputMedia = await getReceivers()
    const outputMedia = []
    await Promise.all(
      inputMedia.map(async mediaEntry => {
        outputMedia.push(await playMedia(mediaEntry))
      })
    )
    console.log(outputMedia)
  } catch (err) {
    console.log(err)
  }
}

play()
