import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth, { actions as authActions } from './auth';
import chats, { actions as chatsActions } from './chats';
import { actions as servicesActions } from './services';
import notification from './notification';

export const actions = {
  ...authActions,
  ...chatsActions,
  ...servicesActions,
};

export default combineReducers({
  auth,
  chats,
  notification,
  routing: routerReducer,
});
