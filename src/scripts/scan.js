import getReceivers from '../lib/cast/getReceivers'

getReceivers()
  .then(media => {
    console.log(JSON.stringify(media, null, 2))
  })
  .catch(err => {
    console.log(err)
  })
