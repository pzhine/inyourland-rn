import getTimeRemaining from './getTimeRemaining'

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

it('should calculate time remaining until next scene', () => {
  expect(
    getTimeRemaining({
      scenes,
      currentTime: 1000,
      duration: 120000,
      nextSceneIndex: 1,
    })
  ).toBe(56506)
})

it('should calculate time remaining, 1 scene behind', () => {
  expect(
    getTimeRemaining({
      scenes,
      currentTime: 1000,
      duration: 120000,
      nextSceneIndex: 2,
    })
  ).toBe(70685)
})

it('should calculate time remaining for last scene', () => {
  expect(
    getTimeRemaining({
      scenes,
      currentTime: 80000,
      duration: 120000,
      nextSceneIndex: 0,
    })
  ).toBe(40000)
})

it('should calculate time remaining for last scene, 1 scene behind', () => {
  expect(
    getTimeRemaining({
      scenes,
      currentTime: 80000,
      duration: 120000,
      nextSceneIndex: 1,
    })
  ).toBe(97506)
})
