import initialState from './initialState'

export default function sceneReducer(state = initialState, action) {
  switch (action.type) {
    case 'SCENE_CHANGE': {
      if (state.isInteracting) {
        return { ...state, nextSceneIndex: action.payload.sceneIndex }
      }
      return {
        ...state,
        currentSceneIndex: action.payload.sceneIndex,
        nextSceneIndex: action.payload.sceneIndex,
      }
    }
    case 'START_INTERACTION': {
      return { ...state, isInteracting: true, interactionTimer: action.payload }
    }
    case 'END_INTERACTION': {
      return {
        ...state,
        isInteracting: false,
        currentSceneIndex: state.nextSceneIndex,
      }
    }
    case 'NEXT_SCENE': {
      return {
        ...state,
        currentSceneIndex: state.currentSceneIndex + 1,
      }
    }
    case 'PREVIOUS_SCENE': {
      return {
        ...state,
        currentSceneIndex: state.currentSceneIndex - 1,
      }
    }
    default: {
      return state
    }
  }
}
