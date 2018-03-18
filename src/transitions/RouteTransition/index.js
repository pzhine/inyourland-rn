import React from 'react'
import { withRouter, matchPath } from 'react-router-native'
import PropTransition from '../PropTransition'

const RouteTransition = ({ children, ...props }) => {
  const { match } = props
  const animations = Object.keys(props.animations).reduce(
    (map, animKey) => ({
      ...map,
      [animKey]: {
        ...props.animations[animKey],
        isIn:
          props.animations[animKey].isIn &&
          (nextValue =>
            props.animations[animKey].isIn(
              matchPath(nextValue.pathname, match.path)
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
      childProps={({ parentProps, childProps }) => ({
        location: childProps.currentValue,
        match: matchPath(childProps.currentValue.pathname, match.path),
        nextMatch:
          parentProps.transitions.location.nextValue &&
          matchPath(
            parentProps.transitions.location.nextValue.pathname,
            match.path
          ),
      })}
    >
      {children}
    </PropTransition>
  )
}

export default withRouter(RouteTransition)
