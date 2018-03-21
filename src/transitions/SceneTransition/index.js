import React from 'react'
import { Animated } from 'react-native'
import PropTransition from '../PropTransition'
import absmod from '../../lib/absmod'

class SceneTransition extends React.Component {
  constructor(props) {
    super(props)

    const { scenes, currentSceneIndex } = props
    this.state = {
      locationId: scenes[absmod(currentSceneIndex, scenes.length)].locationId,
      isTransitioning: false,
      locationInfoAnimation: new Animated.Value(1),
    }
    this.transitionCount = 0
  }
  startLocationInfoAnimation() {
    Animated.timing(this.state.locationInfoAnimation).stop()
    Animated.timing(this.state.locationInfoAnimation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }
  reverseLocationInfoAnimation() {
    Animated.timing(this.state.locationInfoAnimation).stop()
    Animated.timing(this.state.locationInfoAnimation, {
      toValue: 1,
      duration: 200,
      delay: 500,
      useNativeDriver: true,
    }).start()
  }
  componentWillReceiveProps(nextProps) {
    const { scenes, currentSceneIndex } = nextProps
    if (currentSceneIndex !== this.props.currentSceneIndex) {
      this.startLocationInfoAnimation()
      clearTimeout(this.transitionTimer)
      this.transitionTimer = setTimeout(() => {
        this.setState({
          locationId:
            scenes[absmod(currentSceneIndex, scenes.length)].locationId,
          isTransitioning: true,
        })
        this.transitionCount = 0
        this.reverseLocationInfoAnimation()
        // set transitioning timer
        setTimeout(
          () =>
            this.setState({
              isTransitioning: false,
            }),
          1000
        )
      }, this.transitionCount ? 1600 : 1200)
      this.transitionCount += 1
    }
  }
  render() {
    const { children, scenes, currentSceneIndex } = this.props
    return (
      <PropTransition
        holdDuration={500}
        propToWatch="locationId"
        locationId={this.state.locationId}
        animations={{
          mapMove: {
            method: Animated.spring,
            range: [0, 1],
            friction: 10,
            oneWay: true,
          },
        }}
      >
        {({ animations, currentValue, nextValue }) => {
          const childProps = {
            animations: {
              ...animations,
              locationInfo: this.state.locationInfoAnimation,
            },
            scenes,
            currentSceneIndex,
            locationId: currentValue,
            nextLocationId: nextValue,
            locationIsTransitioning: this.state.isTransitioning,
          }
          return React.Children.map(children, child =>
            React.cloneElement(child, childProps)
          )
        }}
      </PropTransition>
    )
  }
}

export default SceneTransition
