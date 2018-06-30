import reducer from './notification';
import types from '../types/notification';

describe('notification reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });
  it('should handle NOTIFICATION', () => {
    const action = {
      type: types.NOTIFICATION,
      payload: { some: 'payload' },
    };
    expect(reducer({}, action)).toEqual({ some: 'payload' });
  });
});
