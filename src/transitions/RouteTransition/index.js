import React from 'react'
import { withRouter, matchPath } from 'react-router-native'
import PropTransition from '../PropTransition'

const RouteTransition = ({ children, ...props }) => {
  let pathToMatch = props.match.path
  if (props.path) {
    pathToMatch = props.path
  }
  const animations = Object.keys(props.animations).reduce(
    (map, animKey) => ({
      ...map,
      [animKey]: {
        ...props.animations[animKey],
        isIn:
          props.animations[animKey].isIn &&
          (nextValue =>
            props.animations[animKey].isIn(
              matchPath(nextValue.pathname, pathToMatch)
            )),
      },
    }),
    {}
  )
  return (
    <PropTransition
      {...props}
      animations={animations}
      propToWatch="location"
      propsAreEqual={({ pre, post }) => pre.pathname === post.pathname}
      childProps={({ parentProps, childProps }) => {
        const routeChildProps = {
          location: childProps.currentValue,
          match: matchPath(childProps.currentValue.pathname, pathToMatch),
          nextMatch:
            parentProps.transitions.location.nextValue &&
            matchPath(
              parentProps.transitions.location.nextValue.pathname,
              pathToMatch
            ),
        }
        routeChildProps.getParam = param =>
          (routeChildProps.match && routeChildProps.match.params[param]) ||
          (routeChildProps.nextMatch && routeChildProps.nextMatch.params[param])
        return routeChildProps
      }}
    >
      {children}
    </PropTransition>
  )
}

export default withRouter(RouteTransition)
