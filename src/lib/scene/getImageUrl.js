import config from '../../../config.json'

function getImageUrl(srcFilename, options) {
  return (
    config.mediaBaseUrl +
    (options.blur ? `${srcFilename}_blur.png` : `${srcFilename}.jpg`)
  )
}

export default getImageUrl
