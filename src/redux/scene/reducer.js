import initialState from './initialState'

export default function sceneReducer(state = initialState, action) {
  switch (action.type) {
    case 'SCENE_CHANGE': {
      console.log('SCENE_CHANGE', action.payload)
      return state
      // return { ...state, currentSceneIndex: action.payload }
    }
    default: {
      return state
    }
  }
}
