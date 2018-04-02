import config from '../../../config.json'

export default {
  endInteraction: () => ({
    type: 'END_INTERACTION',
  }),
  startInteraction: () => (dispatch, getState) => {
    clearTimeout(getState().scene.interactionTimer)
    return dispatch({
      type: 'START_INTERACTION',
      payload: setTimeout(
        () =>
          dispatch({
            type: 'END_INTERACTION',
          }),
        config.interactionTimeout * 1000
      ),
    })
  },
  nextScene: () => ({
    type: 'NEXT_SCENE',
    meta: {
      throttle: 800,
      leading: true,
    },
  }),
  previousScene: () => ({
    type: 'PREVIOUS_SCENE',
    meta: {
      throttle: 800,
      leading: true,
    },
  }),
  changeScene: sceneIndex => ({
    type: 'CHANGE_SCENE',
    payload: sceneIndex,
    meta: {
      throttle: 800,
      leading: true,
    },
  }),
}
