import getSceneIndexForTime from './getSceneIndexForTime'

const scenes = [
  {
    startTime: 0,
    thumbFilename: 'redtailedhawk',
    locationId: 'govsisland',
    subjectId: 'redtailedhawk',
  },
  {
    startTime: 57506,
    thumbFilename: 'pipingplover',
    locationId: 'jamaica',
    subjectId: 'pipingplover',
  },
  {
    startTime: 71685,
    thumbFilename: 'robin',
    locationId: 'centralpark',
    subjectId: 'robin',
  },
]

it('should find a scene', () => {
  expect(getSceneIndexForTime({ scenes, time: 1000 })).toBe(0)
})

it('should find the scene when argument is startTime', () => {
  expect(getSceneIndexForTime({ scenes, time: 57506 })).toBe(1)
})

it('should find the last scene', () => {
  expect(getSceneIndexForTime({ scenes, time: 80000 })).toBe(2)
})
