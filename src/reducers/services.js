import types from '../types/services';

export const actions = {
  redirectTo: payload => ({ type: types.REDIRECT, payload }),
};
