function timer({ io, sceneIndex, delay, scenes, media }) {
  console.log(`set scene change timer for ${media.mediaId}`)
  setTimeout(() => {
    console.log(
      `emit scene change event for ${media.mediaId}, scene ${sceneIndex}`
    )
    io.emit('action', {
      type: 'SCENE_CHANGE',
      payload: { mediaId: media.mediaId, sceneIndex },
    })

    let nextSceneIndex = sceneIndex + 1
    if (nextSceneIndex >= scenes.length) {
      nextSceneIndex = 0
    }
    const nextDelay =
      nextSceneIndex === 0
        ? media.duration * 1000 - scenes[sceneIndex].startTime
        : scenes[nextSceneIndex].startTime - scenes[sceneIndex].startTime

    timer({ io, media, scenes, sceneIndex: nextSceneIndex, delay: nextDelay })
  }, delay)
}

export default timer
