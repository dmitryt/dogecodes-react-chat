import { STORAGE_KEY_TOKEN } from '../config';

export const types = {
  SIGNUP_REQUEST: Symbol('SIGNUP_REQUEST'),
  SIGNUP_SUCCESS: Symbol('SIGNUP_SUCCESS'),
  SIGNUP_FAILURE: Symbol('SIGNUP_FAILURE'),

  LOGIN_REQUEST: Symbol('LOGIN_REQUEST'),
  LOGIN_SUCCESS: Symbol('LOGIN_SUCCESS'),
  LOGIN_FAILURE: Symbol('LOGIN_FAILURE'),

  LOGOUT_REQUEST: Symbol('LOGOUT_REQUEST'),
  LOGOUT_SUCCESS: Symbol('LOGOUT_SUCCESS'),
  LOGOUT_FAILURE: Symbol('LOGOUT_FAILURE'),
};

export const actions = {
  signup: data => ({ type: types.SIGNUP_REQUEST, data }),
  login: data => ({ type: types.LOGIN_REQUEST, data }),
  logout: data => ({ type: types.LOGOUT_REQUEST }),
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
    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
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
