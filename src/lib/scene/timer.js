import setTimer from './setTimer'

function timer({ io, sceneIndex, delay, scenes, mediaEntry, loopCount }) {
  console.log(`set scene change timer for ${mediaEntry.mediaId}`)
  console.log(`


  `)
  setTimeout(() => {
    const loopAdjustedSceneIndex = sceneIndex + loopCount * scenes.length
    console.log(
      `emit scene change event for ${
        mediaEntry.mediaId
      }, scene ${loopAdjustedSceneIndex}`
    )
    if (mediaEntry.socket) {
      mediaEntry.socket.emit('action', {
        type: 'SCENE_CHANGE',
        payload: {
          mediaId: mediaEntry.mediaId,
          sceneIndex: loopAdjustedSceneIndex,
        },
      })
    } else {
      // client hasn't connected to this socket yet
      console.log(`⚠️  Client '${mediaEntry.clientIp}' has not connected yet`)
    }

    // set the next timer
    setTimer({
      scenes,
      mediaEntry,
      io,
      loopCount,
      currentSceneIndex: sceneIndex,
    })
  }, delay)
}

export default timer
