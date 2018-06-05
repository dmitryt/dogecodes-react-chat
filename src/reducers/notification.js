import types from '../types';

export default function notificationReducer(state = {}, action) {
  switch (action.type) {
    case types.NOTIFICATION:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}
