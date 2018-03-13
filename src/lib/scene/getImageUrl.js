import config from '../../../config.json'

function getImageUrl(srcFilename) {
  return config.mediaBaseUrl + srcFilename
}

export default getImageUrl
