import React from 'react'
import { Animated } from 'react-native'
import { withRouter } from 'react-router-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import LocationName from '../../../../components/LocationName'
import Hotspot from '../../../../components/Hotspot'
import NavControls from '../../../../components/NavControls'
import { mixins } from '../../../../shared-styles'
import actions from '../../../../redux/scene/actions'

const Navigator = props => (
  <React.Fragment>
    <Animated.View
      style={{
        ...mixins.fillContainerAbsolute,
        opacity: props.animations.inactiveAnimation,
      }}
    >
      <LocationName {...props} />
      <Hotspot {...props} radius={35} color="#0069FF" ripples={3} />
    </Animated.View>
    <Animated.View
      style={{
        ...mixins.fillContainerAbsolute,
        ...mixins.centerBoth,
        transform: [
          {
            translateY: props.animations.inactiveSpring.interpolate({
              inputRange: [0, 1],
              outputRange: [400, 0],
            }),
          },
        ],
      }}
    >
      <NavControls
        {...props}
        onDetails={() => {
          props.startInteraction()
          props.history.push(
            `/subject/${props.scenes[props.currentSceneIndex].subjectId}/about`
          )
        }}
        onNext={() => console.log('next scene button')}
        onPrevious={() => console.log('previous scene button')}
      />
    </Animated.View>
  </React.Fragment>
)

export default compose(withRouter, connect(null, actions))(Navigator)
