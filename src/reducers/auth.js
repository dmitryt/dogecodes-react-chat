export const types = {
  SIGNUP_REQUEST: Symbol('SIGNUP_REQUEST'),
  SIGNUP_SUCCESS: Symbol('SIGNUP_SUCCESS'),
  SIGNUP_FAILURE: Symbol('SIGNUP_FAILURE'),
  LOGIN_REQUEST: Symbol('LOGIN_REQUEST'),
  LOGIN_SUCCESS: Symbol('LOGIN_SUCCESS'),
  LOGIN_FAILURE: Symbol('LOGIN_FAILURE'),
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: '',
};

export const actions = {
  signup: data => ({ type: types.SIGNUP_REQUEST, data }),
  login: data => ({ type: types.LOGIN_REQUEST, data }),
};

export default function authReducer(state = initialState, action) {
  return state;
}
