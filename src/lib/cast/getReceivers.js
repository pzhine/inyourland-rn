/* eslint-disable no-console */
import mdns from 'mdns'
import config from '../../../config.json'

// scans the network for chromecast receivers
// when it finds one, it looks for the friendly name of the
//   chromecast in mediaList
// if there's a match, it puts the device ip in the "host" field of
//   matching mediaList entry
// returns a promise that resolves when all devices in media.json have been
//   found or the operation times out
function getReceivers(mediaList) {
  const browser = mdns.createBrowser(mdns.tcp('googlecast'))

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('getReceivers timed out')),
      config.castScannerTimeout * 1000
    )

    browser.on('serviceUp', service => {
      console.log('scanning for chromecast devices...')
      const mediaEntry = mediaList.find(
        m => m.deviceId === service.txtRecord.fn
      )
      if (mediaEntry) {
        mediaEntry.host = service.addresses[0]
      }
      if (!mediaList.find(m => !m.host)) {
        browser.stop()
        clearTimeout(timeout)
        resolve()
      }
    })
    browser.start()
  })
}

export default getReceivers
