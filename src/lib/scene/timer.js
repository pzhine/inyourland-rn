import setTimer from './setTimer'

function timer({ io, sceneIndex, delay, scenes, mediaEntry }) {
  console.log(`set scene change timer for ${mediaEntry.mediaId}`)
  setTimeout(() => {
    console.log(
      `emit scene change event for ${mediaEntry.mediaId}, scene ${sceneIndex}`
    )
    if (mediaEntry.socket) {
      console.log('socket', mediaEntry.socket)
      mediaEntry.socket.emit('action', {
        type: 'SCENE_CHANGE',
        payload: { mediaId: mediaEntry.mediaId, sceneIndex },
      })
    } else {
      // client hasn't connected to this socket yet
      console.log(`Client '${mediaEntry.clientIp}' has not connected yet`)
    }

    // set the next timer
    setTimer({ scenes, mediaEntry, io, currentSceneIndex: sceneIndex })
  }, delay)
}

export default timer
