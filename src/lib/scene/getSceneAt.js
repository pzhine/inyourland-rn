const getSceneAt = ({ scenes, time }) =>
  scenes.reduce((sceneAt, scene, idx) => {
    if (
      (!sceneAt && idx === scenes.length - 1) ||
      (time >= scene.startTime && time < scenes[idx + 1].startTime)
    ) {
      return scene
    }
    return sceneAt
  }, null)

export default getSceneAt
