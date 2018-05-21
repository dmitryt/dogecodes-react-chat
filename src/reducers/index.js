import { combineReducers } from 'redux';

import auth, { types as authTypes, actions as authActions } from './auth';

export const commonTypes = {
  FETCH_FAILURE: Symbol('FETCH_FAILURE'),
};


export const types = {
  ...authTypes,
  ...commonTypes,
};

export const actions = {
  ...authActions
};

export default combineReducers({
  auth,
});
