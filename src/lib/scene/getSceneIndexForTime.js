const getSceneIndexForTime = ({ scenes, time }) =>
  scenes.reduce((sceneIndex, scene, idx) => {
    if (
      (sceneIndex === null && idx === scenes.length - 1) ||
      (time >= scene.startTime && time < scenes[idx + 1].startTime)
    ) {
      return idx
    }
    return sceneIndex
  }, null)

export default getSceneIndexForTime
