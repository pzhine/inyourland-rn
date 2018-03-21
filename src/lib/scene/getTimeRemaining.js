import getSceneIndexForTime from './getSceneIndexForTime'

function getTimeRemaining({ scenes, duration, currentTime, nextSceneIndex }) {
  const currentSceneIndex = getSceneIndexForTime({ scenes, time: currentTime })
  if (nextSceneIndex === scenes.length) {
    return duration - currentTime
  }
  if (nextSceneIndex <= currentSceneIndex) {
    return duration - currentTime + scenes[nextSceneIndex].startTime
  }
  return scenes[nextSceneIndex].startTime - currentTime
}

export default getTimeRemaining
