import React from 'react'
import { Animated } from 'react-native'
import transitionProps from '../../hoc/transitionProps'

class PropTransition extends React.Component {
  constructor(props) {
    const { animations, propToWatch } = props
    super(props)

    this._isMounted = false
    this.state = {
      isTransitioning: false,
      animations: Object.keys(animations).reduce(
        (animMap, animKey) => ({
          ...animMap,
          [animKey]: new Animated.Value(
            animations[animKey].range[
              !animations[animKey].isIn ||
              animations[animKey].isIn(props[propToWatch])
                ? 1
                : 0
            ]
          ),
        }),
        {}
      ),
    }
  }
  resetAnimation({ animKey, nextValue }) {
    // console.log('reset', nextValue)
    const animationsInState = { ...this.state.animations }
    const animation = this.props.animations[animKey]
    animationsInState[animKey] = new Animated.Value(
      animation.range[animation.isIn(nextValue) ? 1 : 0]
    )
    this.setState({ animations: animationsInState })
  }
  componentWillReceiveProps(nextProps) {
    const { animations, propToWatch } = this.props
    const propTransition = nextProps.transitions[propToWatch]
    if (propTransition.becameActiveSince(this.props.transitions)) {
      Object.keys(animations).forEach(animKey => {
        const {
          method,
          range,
          duration,
          inDelay,
          outDelay,
          isIn,
          ...options
        } = animations[animKey]
        method(this.state.animations[animKey], {
          duration: duration / 2,
          toValue: range[isIn && isIn(propTransition.nextValue) ? 1 : 0],
          delay: isIn && isIn(propTransition.nextValue) ? inDelay : outDelay,
          useNativeDriver: true,
          ...options,
        }).start()
      })
    }
    if (propTransition.isActive && !this.state.isTransitioning) {
      this.setState({ isTransitioning: true })
      setTimeout(() => {
        if (this._isMounted) {
          this.setState({ isTransitioning: false })
        }
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
          outDelay,
          isIn,
          ...options
        } = animations[animKey]
        if (!isIn) {
          method(this.state.animations[animKey], {
            duration: duration / 2,
            toValue: range[1],
            delay: outDelay || 0,
            useNativeDriver: true,
            ...options,
          }).start()
        } else {
          this.resetAnimation({ animKey, nextValue: nextProps[propToWatch] })
        }
      })
    }
  }
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
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
    const child = React.Children.only(children)
    childProps.animations = {
      ...child.props.animations,
      ...childProps.animations,
    }
    return React.cloneElement(child, childProps)
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
