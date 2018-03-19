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
        duration: 1000,
        inDelay: 700,
      },
      sectionAnimation: {
        range: [0, 1],
        method: Animated.timing,
        duration: 400,
      },
    }}
  >
    {({ animations, getParam }) => {
      const subjectId = getParam('subjectId')
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
            sectionId={getParam('sectionId')}
            animations={animations}
          />
        </Animated.View>
      ) : null
    }}
  </RouteTransition>
)

export default SubjectRoute
