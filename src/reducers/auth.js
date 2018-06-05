import { STORAGE_KEY_TOKEN } from '../config';
import types from '../types/auth';

export const actions = {
  signup: data => ({ type: types.SIGNUP_REQUEST, data }),
  login: data => ({ type: types.LOGIN_REQUEST, data }),
  logout: data => ({ type: types.LOGOUT_REQUEST }),
  receiveAuth: data => ({ type: types.RECEIVE_AUTH_REQUEST, data }),
  updateUser: data => ({ type: types.UPDATE_USER_REQUEST, data }),
};

const token = localStorage.getItem(STORAGE_KEY_TOKEN) || '';

const initialState = {
  isAuthenticated: !!token,
  user: null,
  token,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        token: payload.token,
      };
    case types.RECEIVE_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
    case types.RECEIVE_AUTH_FAILURE:
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: '',
      };
    default:
      return state;
  }
}
