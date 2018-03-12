import initialState from './initialState'

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MENU_ACTIVE': {
      return { ...state, menuIsActive: action.payload }
    }
    default: {
      return state
    }
  }
}
