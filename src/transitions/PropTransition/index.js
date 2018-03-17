import React from 'react'
import { Animated } from 'react-native'
import transitionProps from '../../hoc/transitionProps'

class PropTransition extends React.Component {
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
    const { animations, propToWatch } = this.props
    if (
      nextProps.transitions[propToWatch].becameActiveSince(
        this.props.transitions
      )
    ) {
      Object.keys(animations).forEach(animKey => {
        const {
          method,
          range,
          duration,
          oneWay,
          outDelay,
          inDelay,
          ...options
        } = animations[animKey]
        method(this.state.animations[animKey], {
          duration: duration / 2,
          toValue: range[0],
          delay: outDelay || 0,
          useNativeDriver: true,
          ...options,
        }).start()
      })
    }
    if (
      nextProps.transitions[propToWatch].isActive &&
      !this.state.isTransitioning
    ) {
      this.setState({ isTransitioning: true })
      setTimeout(() => {
        this.setState({ isTransitioning: false })
      }, this.props.holdDuration)
    }
    if (
      !this.props.propsAreEqual({
        pre: this.props[propToWatch],
        post: nextProps[propToWatch],
      })
    ) {
      Object.keys(animations).forEach(animKey => {
        const {
          method,
          range,
          duration,
          oneWay,
          outDelay,
          inDelay,
          ...options
        } = animations[animKey]
        if (!oneWay) {
          method(this.state.animations[animKey], {
            duration: duration / 2,
            toValue: range[1],
            delay: inDelay || 0,
            useNativeDriver: true,
            ...options,
          }).start()
        } else {
          this.resetAnimation(animKey)
        }
      })
    }
  }
  render() {
    const { children, transitions, propToWatch } = this.props
    let childProps = {
      animations: this.state.animations,
      currentValue: this.props[propToWatch],
      nextValue: transitions[propToWatch].nextValue,
      isTransitioning: this.state.isTransitioning,
    }
    childProps = {
      ...childProps,
      ...this.props.childProps({ parentProps: this.props, childProps }),
    }
    if (typeof children === 'function') {
      return <React.Fragment>{this.props.children(childProps)}</React.Fragment>
    }
    return React.cloneElement(React.Children.only(children), childProps)
  }
}

PropTransition.defaultProps = {
  propsAreEqual: ({ pre, post }) => pre === post,
  childProps: () => {},
}

export default transitionProps({
  propsToTransition: props => ({
    [props.propToWatch]: {
      duration: props.holdDuration,
      compare: props.propsAreEqual,
    },
  }),
})(PropTransition)
