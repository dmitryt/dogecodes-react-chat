import reducer from './services';
import types from '../types';

describe('services reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ isConnected: false });
  });
  it('should handle WS_CONNECTION_SUCCESS', () => {
    const action = {
      type: types.WS_CONNECTION_SUCCESS,
    };
    expect(reducer({}, action)).toEqual({ isConnected: true });
  });
  it('should handle WS_CONNECTION_RECONNECT', () => {
    const action = {
      type: types.WS_CONNECTION_RECONNECT,
    };
    expect(reducer({}, action)).toEqual({ isConnected: true });
  });
  it('should handle WS_CONNECTION_FAILURE', () => {
    const action = {
      type: types.WS_CONNECTION_FAILURE,
    };
    expect(reducer({}, action)).toEqual({ isConnected: false });
  });
});
