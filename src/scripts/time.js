import getReceivers from '../lib/cast/getReceivers'
import playMedia from '../lib/cast/playMedia'
import getCurrentTime from '../lib/cast/getCurrentTime'

// play first media stream and query current time every 5 seconds
async function time() {
  try {
    const media = await getReceivers()
    media[0] = await playMedia(media[0])
    setInterval(async () => {
      const currentTime = await getCurrentTime(media[0].player)
      console.log('time', currentTime)
    }, 5000)
  } catch (err) {
    console.log(err)
  }
}

time()
