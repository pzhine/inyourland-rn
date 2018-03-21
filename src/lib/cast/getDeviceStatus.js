import { Client } from 'castv2-client'
import config from '../../../config.json'

function getDeviceStatus(host) {
  const client = new Client()

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('getDeviceStatus timed out')),
      config.castStatusTimeout * 1000
    )
    client.on('error', err => {
      client.close()
      reject(err)
    })
    client.connect(host, () => {
      client.getStatus((err, status) => {
        clearTimeout(timeout)
        resolve(status.applications[0])
      })
    })
  })
}

export default getDeviceStatus
