import { combineReducers } from 'redux';

import types from '../types';

export const actions = {
  redirectTo: payload => ({ type: types.REDIRECT, payload }),
};

const initialState = {
  isConnected: false,
};

function isConnected(state = initialState.isConnected, action) {
  switch (action.type) {
    case types.WS_CONNECTION_SUCCESS:
    case types.WS_CONNECTION_RECONNECT:
      return true;
    case types.WS_CONNECTION_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  isConnected,
});
