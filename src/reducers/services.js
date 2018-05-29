import types from '../types/services';

export const actions = {
  redirectTo: data => ({ type: types.REDIRECT, data }),
};
