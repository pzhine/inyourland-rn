import { NetworkInfo } from 'react-native-network-info'
import config from '../../../config.json'

function getClientIp() {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => reject(new Error('getClientIp timed out')),
      config.clientIpTimeout * 1000
    )
    NetworkInfo.getIPAddress(ip => {
      resolve(ip)
    })
  })
}

export default getClientIp
