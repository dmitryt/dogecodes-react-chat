import { all, takeEvery } from 'redux-saga/effects';

import { types } from '../reducers';
import authSaga from './auth';

export default function* rootSaga() {
  yield all([
    takeEvery(types.LOGIN_REQUEST, authSaga.login),
    takeEvery(types.SIGNUP_REQUEST, authSaga.signup),
    takeEvery(types.LOGOUT_REQUEST, authSaga.logout),
  ]);
}
