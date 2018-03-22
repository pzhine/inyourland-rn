import _ from 'lodash'
import config from '../../../config.json'

const endInteraction = () => ({
  type: 'END_INTERACTION',
})
const startInteraction = () => (dispatch, getState) => {
  clearTimeout(getState().scene.interactionTimer)
  return dispatch({
    type: 'START_INTERACTION',
    payload: setTimeout(
      () => dispatch(endInteraction()),
      config.interactionTimeout * 1000
    ),
  })
}
const nextScene = () => ({
  type: 'NEXT_SCENE',
  meta: {
    throttle: 700,
    leading: true,
  },
})
const previousScene = () => ({
  type: 'PREVIOUS_SCENE',
  meta: {
    throttle: 700,
    leading: true,
  },
})

export default { endInteraction, startInteraction, previousScene, nextScene }
