import { combineReducers } from 'redux';

import auth, { actions as authActions } from './auth';
import notification from './notification';

export const actions = {
  ...authActions,
};

export default combineReducers({
  auth,
  notification,
});
