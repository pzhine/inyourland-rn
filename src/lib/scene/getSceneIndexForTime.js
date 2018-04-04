const getSceneIndexForTime = ({ scenes, time }) => {
  for (let idx = 0; idx < scenes.length; idx += 1) {
    if (
      idx === scenes.length - 1 ||
      (time >= scenes[idx].startTime && time < scenes[idx + 1].startTime)
    ) {
      return idx
    }
  }
  throw new Error(`No scene found for time ${time}`)
}

export default getSceneIndexForTime
