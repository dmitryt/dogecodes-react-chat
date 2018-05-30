import { combineReducers } from 'redux';

import auth, { types as authTypes, actions as authActions } from './auth';
import notification, { types as notificationTypes } from './notification';

export const types = {
  ...authTypes,
  ...notificationTypes,
};

export const actions = {
  ...authActions,
};

export default combineReducers({
  auth,
  notification,
});
