import config from '../../../config.json'

function getImageUrl(srcFilename, options = {}) {
  if (options.map) {
    return `${config.mediaBaseUrl}map-${srcFilename}.png`
  }
  return (
    config.mediaBaseUrl +
    (options.blur ? `${srcFilename}_blur.png` : `${srcFilename}.jpg`)
  )
}

export default getImageUrl
