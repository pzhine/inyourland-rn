import { getDeviceStatus, playMedia, getCurrentTime } from './'

async function restartIfInactive({
  mediaEntry,
  currentSceneIndex,
  currentTime,
}) {
  try {
    console.log(`ℹ️  checking status on ${mediaEntry.deviceId}`)
    const status = await getDeviceStatus(mediaEntry.host)
    if (!status || status.isIdleScreen) {
      try {
        await playMedia(mediaEntry)
        return {
          currentSceneIndex: 0,
          currentTime:
            (await getCurrentTime(mediaEntry.player)) % mediaEntry.duration,
        }
      } catch (err) {
        console.log(
          `❌  restartIfInactive: restart media failed on ${mediaEntry.host}`,
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
