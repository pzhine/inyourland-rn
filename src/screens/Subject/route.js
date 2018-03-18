import React from 'react'
import { Animated } from 'react-native'
import { Route } from 'react-router-native'
import RouteTransition from '../../transitions/RouteTransition'
import subjects from '../../../content/subjects.json'
import Subject from './'
import { mixins } from '../../shared-styles'

const SubjectRoute = props => (
  <Route
    path="/:screen?/:subjectId?/:sectionId?"
    render={() => (
      <RouteTransition
        holdDuration={500}
        animations={{
          inOutAnimation: {
            isIn: nextMatch => nextMatch.params.subjectId,
            range: [0, 1],
            method: Animated.timing,
            duration: 500,
          },
        }}
      >
        {({ animations, match, nextMatch }) => {
          // console.log('subjectroute.render', match, nextMatch)
          let { subjectId } = match.params
          let activeMatch = match
          if (!subjectId && nextMatch) {
            subjectId = nextMatch.params.subjectId
            activeMatch = nextMatch
          }
          return (
            <Animated.View
              style={{
                opacity: animations.inOutAnimation,
                ...mixins.fillContainerAbsolute,
              }}
            >
              {subjectId && (
                <Subject
                  {...props}
                  match={activeMatch}
                  subject={subjects.find(s => s.subjectId === subjectId)}
                />
              )}
            </Animated.View>
          )
        }}
      </RouteTransition>
    )}
  />
)

export default SubjectRoute
