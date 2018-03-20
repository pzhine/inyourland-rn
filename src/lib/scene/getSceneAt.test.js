import getSceneAt from './getSceneAt'

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
  expect(getSceneAt({ scenes, time: 1000 })).toEqual(scenes[0])
})

it('should find the scene when argument is startTime', () => {
  expect(getSceneAt({ scenes, time: 57506 })).toEqual(scenes[1])
})

it('should find the last scene', () => {
  expect(getSceneAt({ scenes, time: 80000 })).toEqual(scenes[2])
})
