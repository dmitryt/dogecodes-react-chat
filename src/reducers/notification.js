import types from '../types';

export const actions = {
  notify: payload => ({ type: types.NOTIFICATION, payload }),
};

export default function notificationReducer(state = {}, action) {
  switch (action.type) {
    case types.NOTIFICATION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
