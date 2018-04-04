import mdns from 'mdns'
import config from '../../../config.json'

// scans the network for chromecast receivers
// when it finds one, it looks for the friendly name of the
//   chromecast in mediaList
// if there's a match, it puts the device ip in the "host" field of
//   the mediaEntry
function getReceiver(mediaEntry) {
  const browser = mdns.createBrowser(mdns.tcp('googlecast'))

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('getReceiver timed out')),
      config.castScannerTimeout * 1000
    )

    browser.on('serviceUp', service => {
      if (mediaEntry.deviceId === service.txtRecord.fn) {
        console.log(`found ${service.txtRecord.fn}`)
        mediaEntry.host = service.addresses[0]
        browser.stop()
        clearTimeout(timeout)
        resolve()
      }
    })

    console.log('scanning for chromecast devices...')
    browser.start()
  })
}

export default getReceiver
