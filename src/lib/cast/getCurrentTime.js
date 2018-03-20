import config from '../../../config.json'

function getCurrentTime(player) {
  console.log('getCurrentTime')

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('getCurrentTime timed out')),
      config.castStatusTimeout * 1000
    )
    player.getStatus((err, status) => {
      clearTimeout(timeout)
      resolve(status.currentTime)
    })
  })
}

export default getCurrentTime
