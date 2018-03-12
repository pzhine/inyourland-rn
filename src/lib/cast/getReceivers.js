/* eslint-disable no-console */
import mdns from 'mdns'
import media from '../../../content/media.json'
import config from '../../../config.json'

// scans the network for chromecast receivers
// when it finds one, it looks for the friendly name of the
//   chromecast in media.json
// if there's a match, it puts the device ip in the "host" field of
//   matching media.json entry
// returns a promise that resolves when all devices in media.json have been
//   found or the operation times out
function getReceivers() {
  const browser = mdns.createBrowser(mdns.tcp('googlecast'))

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject('getReceivers timed out'),
      config.castScannerTimeout * 1000
    )

    browser.on('serviceUp', service => {
      console.log('scanning for chromecast devices...')
      const mediaEntry = media.find(m => m.deviceId === service.txtRecord.fn)
      if (mediaEntry) {
        mediaEntry.host = service.addresses[0]
      }
      if (!media.find(m => !m.host)) {
        browser.stop()
        clearTimeout(timeout)
        resolve(media)
      }
    })
    browser.start()
  })
}

export default getReceivers
