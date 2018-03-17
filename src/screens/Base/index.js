import React from 'react'

import Map from '../../components/Map'
import Carousel from '../../components/Carousel'

const Base = ({ ...props }) => {
  console.log('route', props.route)
  return (
    <React.Fragment>
      <Map {...props} />
      <Carousel {...props} />
    </React.Fragment>
  )
}

export default Base
