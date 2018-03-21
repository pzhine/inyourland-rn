import timer from './timer'
import { getTimeRemaining } from './'
import { getCurrentTime } from '../cast'

async function setTimer({ scenes, mediaEntry, io, currentSceneIndex }) {
  // get current time from chromecast, adjusted for loop
  const currentTime =
    (await getCurrentTime(mediaEntry.player)) % mediaEntry.duration

  console.log('🕑  current time', currentTime)

  // calc nextSceneIndex
  let nextSceneIndex = currentSceneIndex + 1
  if (nextSceneIndex >= scenes.length) {
    nextSceneIndex = 0
  }

  console.log('⏭️  next scene', nextSceneIndex)

  // calculate time remaining
  const timeRemaining = getTimeRemaining({
    scenes,
    currentTime,
    nextSceneIndex,
    duration: mediaEntry.duration,
  })
  console.log(`⏱️  time remaining`, timeRemaining)

  // start timer
  timer({
    io,
    scenes,
    mediaEntry,
    sceneIndex: nextSceneIndex,
    delay: parseInt(timeRemaining, 10),
  })
}

export default setTimer
