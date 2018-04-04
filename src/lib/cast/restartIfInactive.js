import { getReceiver, getDeviceStatus, playMedia, getCurrentTime } from './'

async function restartIfInactive({
  mediaEntry,
  currentSceneIndex,
  currentTime,
}) {
  try {
    console.log(`ℹ️  checking status on ${mediaEntry.deviceId}`)
    await getReceiver(mediaEntry)
    const status = await getDeviceStatus(mediaEntry.host)
    if (!status || status.isIdleScreen || !mediaEntry.isPlaying) {
      try {
        await playMedia(mediaEntry)
        return {
          currentSceneIndex: 0,
          currentTime:
            (await getCurrentTime(mediaEntry.player)) % mediaEntry.duration,
        }
      } catch (err) {
        console.log(
          `❌  restartIfInactive: restart failed on ${mediaEntry.deviceId}`,
          err
        )
      }
    }
  } catch (err) {
    console.log(
      `❌  restartIfInactive: device unreachable ${mediaEntry.host}`,
      err
    )
  }
  return { currentSceneIndex, currentTime }
}

export default restartIfInactive
