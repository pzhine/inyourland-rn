import React from 'react'

import Map from '../../components/Map'
import Carousel from '../../components/Carousel'

const Base = ({ routeMatch, routeAnimations, ...props }) => (
  <React.Fragment>
    <Map
      {...props}
      blur={routeMatch.params.two}
      blurAnimation={routeAnimations.navToSubject}
    />
    <Carousel {...props} />
  </React.Fragment>
)

export default Base
