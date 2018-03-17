import locations from '../../../content/locations.json'

const getLocation = locationId =>
  locations.find(loc => loc.locationId === locationId)

export default getLocation
