import React from 'react'

import Map from '../../../../components/Map'
import Carousel from '../../../../components/Carousel/gestures'

const Base = props => (
  <React.Fragment>
    <Map {...props} />
    <Carousel {...props} />
  </React.Fragment>
)

export default Base
