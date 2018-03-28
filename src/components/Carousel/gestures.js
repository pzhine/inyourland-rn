import React from 'react'
import { PanResponder, View } from 'react-native'
import { connect } from 'react-redux'
import Carousel from './'
import { mixins } from '../../shared-styles'
import actions from '../../redux/scene/actions'

const MOVE_THRESHOLD = 100
const VELOCITY_THRESHOLD = 1

class CarouselGestures extends React.Component {
  constructor(props) {
    super(props)
    this.isAnimating = false
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderMove: (e, gestureState) => {
        if (
          !this.isAnimating &&
          (gestureState.vx > VELOCITY_THRESHOLD ||
            Math.abs(gestureState.dx) > MOVE_THRESHOLD)
        ) {
          this.props.startInteraction()
          if (gestureState.dx > 0) {
            this.props.previousScene()
          } else {
            this.props.nextScene()
          }
          this.isAnimating = true
        }
      },
      onPanResponderRelease: () => {
        this.isAnimating = false
      },
    })
  }

  render() {
    return (
      <View
        {...this._panResponder.panHandlers}
        style={mixins.fillContainerAbsolute}
      >
        <Carousel {...this.props} />
      </View>
    )
  }
}

export default connect(null, actions)(CarouselGestures)
