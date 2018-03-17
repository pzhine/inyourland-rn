import React from 'react'
import LocationName from '../../components/LocationName'
import Hotspot from '../../components/Hotspot'
import NavControls from '../../components/NavControls'

const Navigator = props => (
  <React.Fragment>
    <LocationName {...props} />
    <Hotspot {...props} radius={35} color="#0069FF" ripples={3} />
    <NavControls {...props} />
  </React.Fragment>
)

export default Navigator
