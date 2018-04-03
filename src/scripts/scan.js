import getReceivers from '../lib/cast/getReceivers'
import mediaList from '../../content/media.json'

getReceivers(mediaList)
  .then(media => {
    console.log(JSON.stringify(media, null, 2))
  })
  .catch(err => {
    console.log(err)
  })
