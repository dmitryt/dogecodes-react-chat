import reducer from './auth';
import types from '../types/auth';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticated: false,
      token: '',
      user: null,
    });
  });
  it('should handle SIGNUP_SUCCESS', () => {
    const action = {
      type: types.SIGNUP_SUCCESS,
      payload: { user: { username: 'john' }, token: '123' },
    };
    expect(reducer({}, action)).toEqual({
      isAuthenticated: true,
      token: '123',
      user: { username: 'john' },
    });
  });
  it('should handle LOGIN_SUCCESS', () => {
    const action = {
      type: types.LOGIN_SUCCESS,
      payload: { user: { username: 'john' }, token: '123' },
    };
    expect(reducer({}, action)).toEqual({
      isAuthenticated: true,
      token: '123',
      user: { username: 'john' },
    });
  });
  it('should handle RECEIVE_AUTH_SUCCESS', () => {
    const action = {
      type: types.RECEIVE_AUTH_SUCCESS,
      payload: { user: { username: 'john' } },
    };
    expect(reducer({}, action)).toEqual({
      isAuthenticated: true,
      user: { username: 'john' },
    });
  });
  it('should handle SIGNUP_FAILURE', () => {
    const action = {
      type: types.SIGNUP_FAILURE,
    };
    expect(reducer({}, action)).toEqual({
      isAuthenticated: false,
      user: null,
      token: '',
    });
  });
  it('should handle LOGIN_FAILURE', () => {
    const action = {
      type: types.LOGIN_FAILURE,
    };
    expect(reducer({}, action)).toEqual({
      isAuthenticated: false,
      user: null,
      token: '',
    });
  });
  it('should handle RECEIVE_AUTH_FAILURE', () => {
    const action = {
      type: types.RECEIVE_AUTH_FAILURE,
    };
    expect(reducer({}, action)).toEqual({
      isAuthenticated: false,
      user: null,
      token: '',
    });
  });
  it('should handle LOGOUT_SUCCESS', () => {
    const action = {
      type: types.LOGOUT_SUCCESS,
    };
    expect(reducer({}, action)).toEqual({
      isAuthenticated: false,
      user: null,
      token: '',
    });
  });
});
