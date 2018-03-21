import timer from './timer'
import { getTimeRemaining } from './'
import { getCurrentTime } from '../cast'

async function setTimer({
  scenes,
  mediaEntry,
  io,
  currentSceneIndex,
  loopCount,
}) {
  // set fallback current time to start time of current scene
  let currentTime = scenes[currentSceneIndex].startTime

  try {
    // try get current time from chromecast, adjusted for loop
    currentTime =
      (await getCurrentTime(mediaEntry.player)) % mediaEntry.duration
  } catch (err) {
    console.log(`⚠️  Warning: getCurrentTime failed for %{mediaEntry.deviceId}`)
  }

  console.log('🕑  current time', currentTime)

  // calc nextSceneIndex
  let nextSceneIndex = currentSceneIndex + 1
  if (nextSceneIndex >= scenes.length) {
    nextSceneIndex = 0
    loopCount += 1
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
    loopCount,
  })
}

export default setTimer
