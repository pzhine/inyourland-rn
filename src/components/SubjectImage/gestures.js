import React from 'react'
import { PanResponder, View } from 'react-native'
import { connect } from 'react-redux'
import actions from '../../redux/scene/actions'

const MOVE_THRESHOLD = 20
const VELOCITY_THRESHOLD = 0.3

const gestureIsPan = gestureState =>
  gestureState.vx > VELOCITY_THRESHOLD ||
  Math.abs(gestureState.dx) > MOVE_THRESHOLD

class CarouselGestures extends React.Component {
  constructor(props) {
    super(props)
    this.isAnimating = false
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderMove: (e, gestureState) => {
        if (!this.isAnimating && gestureIsPan(gestureState)) {
          this.props.startInteraction()
          if (gestureState.dx > 0) {
            this.props.previousScene()
          } else {
            this.props.nextScene()
          }
          this.isAnimating = true
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        this.isAnimating = false
        if (!gestureIsPan(gestureState)) {
          this.props.onPress()
        }
      },
    })
  }

  render() {
    return (
      <View {...this._panResponder.panHandlers}>{this.props.children}</View>
    )
  }
}

export default connect(
  state => ({
    currentSceneIndex: state.scene.currentSceneIndex,
  }),
  actions
)(CarouselGestures)
