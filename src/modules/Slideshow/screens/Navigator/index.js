import React from 'react'
import { Animated } from 'react-native'
import { withRouter } from 'react-router-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import LocationName from '../../../../components/LocationName'
import Hotspot from '../../../../components/Hotspot'
import NavControls from '../../../../components/NavControls'
import CurrentSceneButton from '../../../../components/CurrentSceneButton'
import { mixins } from '../../../../shared-styles'
import actions from '../../../../redux/scene/actions'
import absmod from '../../../../lib/absmod'

const Navigator = props => (
  <React.Fragment>
    <Animated.View
      pointerEvents="box-none"
      style={{
        ...mixins.fillContainerAbsolute,
        opacity: props.animations.inactiveAnimation,
      }}
    >
      <LocationName {...props} />
      <Hotspot {...props} radius={35} color="#0069FF" ripples={3} />
      <CurrentSceneButton
        scene={props.scenes[absmod(props.nextSceneIndex, props.scenes.length)]}
        isVisible={
          props.isInteracting &&
          props.currentSceneIndex !== props.nextSceneIndex
        }
        onPress={props.endInteraction}
      />
    </Animated.View>
    <Animated.View
      pointerEvents="box-none"
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
          const { currentSceneIndex, scenes } = props
          props.startInteraction()
          props.history.push(
            `/subject/${
              scenes[absmod(currentSceneIndex, scenes.length)].subjectId
            }/about`
          )
        }}
        onNext={() => {
          props.startInteraction()
          props.nextScene()
        }}
        onPrevious={() => {
          props.startInteraction()
          props.previousScene()
        }}
      />
    </Animated.View>
  </React.Fragment>
)

export default compose(
  withRouter,
  connect(
    state => ({
      isInteracting: state.scene.isInteracting,
      nextSceneIndex: state.scene.nextSceneIndex,
    }),
    actions
  )
)(Navigator)
