import {Map} from 'immutable';

export const RESET_STATE = 'SessionState/RESET';
export const INITIALIZE_STATE = 'SessionState/INITIALIZE';
export const SET_SIDEMENU_STATE = 'SessionState/SET_SIDEMENU_STATE';
export const TOGGLE_SIDEMENU_STATE = 'SessionState/TOGGLE_SIDEMENU_STATE';

// Initial state
const initialState = Map({
  isReady: false,
  isSideMenuOpen: false
});

export function resetSessionStateFromSnapshot(state) {
  return {
    type: RESET_STATE,
    payload: state
  };
}

export function setSideMenuState(state) {
  return {
    type: SET_SIDEMENU_STATE,
    payload: state
  };
}

export function toggleSideMenuState() {
  return {
    type: TOGGLE_SIDEMENU_STATE,
  };
}

export function initializeSessionState() {
  return {
    type: INITIALIZE_STATE
  };
}

// Reducer
export default function SessionStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INITIALIZE_STATE:
    case RESET_STATE:
      return state.set('isReady', true);
    case SET_SIDEMENU_STATE:
      return state.set('isSideMenuOpen', action.payload);
    case TOGGLE_SIDEMENU_STATE:
      return state.set('isSideMenuOpen', !state.get('isSideMenuOpen'));
    default:
      return state;
  }
}
