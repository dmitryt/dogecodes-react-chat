import { all } from 'redux-saga/effects';

import authSagas from './auth';
import chatSagas from './chats';
import servicesSagas from './services';
import socketsSagas from './sockets';

export default function* rootSaga() {
  yield all([...authSagas, ...chatSagas, ...servicesSagas, ...socketsSagas]);
}
