import React from 'react'
import LocationName from '../../components/LocationName'
import Hotspot from '../../components/Hotspot'

const Navigator = ({ locationId, animations }) => (
  <React.Fragment>
    <LocationName animations={animations} locationId={locationId} />
    <Hotspot
      animations={animations}
      locationId={locationId}
      radius={35}
      color="#0069FF"
      ripples={3}
    />
  </React.Fragment>
)

export default Navigator
