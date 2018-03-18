import initialState from './initialState'

export default function sceneReducer(state = initialState, action) {
  switch (action.type) {
    case 'SCENE_CHANGE': {
      if (state.isInteracting) {
        return { ...state, nextSceneIndex: action.payload.sceneIndex }
      }
      return { ...state, currentSceneIndex: action.payload.sceneIndex }
    }
    case 'START_INTERACTION': {
      return { ...state, isInteracting: true }
    }
    case 'END_INTERACTION': {
      return {
        ...state,
        isInteracting: false,
        currentSceneIndex: state.nextSceneIndex,
      }
    }
    default: {
      return state
    }
  }
}
