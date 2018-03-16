import React from 'react'
import { compose } from 'redux'
import { Animated } from 'react-native'
import { withRouter, matchPath } from 'react-router-native'
import transitionProps from '../../hoc/transitionProps'

class RouteTransition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isTransitioning: false,
      animations: Object.keys(props.animations).reduce(
        (animMap, animKey) => ({
          ...animMap,
          [animKey]: new Animated.Value(props.animations[animKey].range[1]),
        }),
        {}
      ),
    }
  }
  resetAnimation(animKey) {
    const animationsInState = { ...this.state.animations }
    animationsInState[animKey] = new Animated.Value(
      this.props.animations[animKey].range[1]
    )
    this.setState({ animations: animationsInState })
  }
  componentWillReceiveProps(nextProps) {
    const { location, animations } = this.props
    if (
      nextProps.transitions.location.becameActiveSince(
        this.props.transitions.location
      )
    ) {
      Object.keys(animations).forEach(animKey => {
        const { method, range, duration } = animations[animKey]
        method(this.state.animations[animKey], {
          duration: duration / 2,
          toValue: range[0],
        }).start()
      })
    }
    if (
      nextProps.transitions.location.isActive &&
      !this.state.isTransitioning
    ) {
      this.setState({ isTransitioning: true })
      setTimeout(() => {
        this.setState({ isTransitioning: false })
      }, this.props.holdDuration)
    }
    if (location.pathname !== nextProps.location.pathname) {
      Object.keys(animations).forEach(animKey => {
        const { method, range, duration, oneWay } = animations[animKey]
        if (!oneWay) {
          method(this.state.animations[animKey], {
            duration: duration / 2,
            toValue: range[1],
          }).start()
        } else {
          this.resetAnimation(animKey)
        }
      })
    }
  }
  render() {
    const { transitions, children, location, match } = this.props
    const childProps = {
      animations: this.state.animations,
      match: matchPath(location.pathname, match.path),
      nextMatch:
        transitions.location.nextValue &&
        matchPath(transitions.location.nextValue.pathname, match.path),
      isTransitioning: this.state.isTransitioning,
    }
    if (typeof children === 'function') {
      return <React.Fragment>{this.props.children(childProps)}</React.Fragment>
    }
    return React.cloneElement(React.Children.only(children), childProps)
  }
}

export default compose(
  withRouter,
  transitionProps({
    propsToTransition: props => ({
      location: {
        duration: props.holdDuration,
        compare: ({ pre, post }) => pre.pathname === post.pathname,
      },
    }),
  })
)(RouteTransition)
