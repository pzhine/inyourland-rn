import React from 'react'
import { withRouter, matchPath } from 'react-router-native'
import PropTransition from '../PropTransition'

export const transitionStyle = ({
  animations,
  isActive,
  isActiveNext,
  isVisibleOnActive,
}) => {
  if (!isActive && !isActiveNext) {
    return { opacity: isVisibleOnActive ? 0 : 1 }
  }
  return {
    opacity: animations.fade.interpolate({
      inputRange: [0, 1],
      outputRange:
        (isActive && isVisibleOnActive) || (isActiveNext && !isVisibleOnActive)
          ? [0, 1]
          : [1, 0],
    }),
  }
}

const RouteTransition = ({ children, ...props }) => {
  const { match } = props
  return (
    <PropTransition
      {...props}
      propToWatch="location"
      propsAreEqual={({ pre, post }) => pre.pathname === post.pathname}
      childProps={({ parentProps, childProps }) => {
        const matchProps = {
          match: matchPath(parentProps.location.pathname, match.path),
          nextMatch:
            parentProps.transitions.location.nextValue &&
            matchPath(
              parentProps.transitions.location.nextValue.pathname,
              match.path
            ),
        }
        return {
          ...matchProps,
          transitionOpacityOnMatch: isVisibleOnMatch =>
            transitionStyle({
              animations: childProps.animations,
              isActive: matchProps.match,
              isActiveNext: matchProps.nextMatch,
              isVisibleOnAcive: isVisibleOnMatch,
            }),
        }
      }}
    >
      {children}
    </PropTransition>
  )
}

export default withRouter(RouteTransition)
