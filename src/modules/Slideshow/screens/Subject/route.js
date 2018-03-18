import React from 'react'
import { Animated } from 'react-native'
import RouteTransition from '../../../../transitions/RouteTransition'
import subjects from '../../../../../content/subjects.json'
import Subject from './'
import { mixins } from '../../../../shared-styles'

const SubjectRoute = props => (
  <RouteTransition
    holdDuration={400}
    path="/:screen?/:subjectId?/:sectionId?"
    animations={{
      inOutAnimation: {
        isIn: nextMatch => nextMatch.params.subjectId,
        range: [0, 1],
        method: Animated.timing,
        duration: 800,
        inDelay: 700,
      },
      sectionAnimation: {
        range: [0, 1],
        method: Animated.timing,
        duration: 400,
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
      return subjectId ? (
        <Animated.View
          style={{
            opacity: animations.inOutAnimation,
            ...mixins.fillContainerAbsolute,
          }}
        >
          <Subject
            {...props}
            subject={subjects.find(s => s.subjectId === subjectId)}
            sectionId={activeMatch.params.sectionId}
            animations={animations}
          />
        </Animated.View>
      ) : null
    }}
  </RouteTransition>
)

export default SubjectRoute
