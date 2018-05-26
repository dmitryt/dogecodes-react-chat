import { all } from 'redux-saga/effects';

import authSagas from './auth';
import chatSagas from './chats';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...chatSagas,
  ])
}
