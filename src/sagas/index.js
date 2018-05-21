import { all, takeEvery } from 'redux-saga/effects';

import { types } from '../reducers';
import authSaga from './auth';

function* showErrorAlert (action) {
  // const { error } = action
  // yield call(Alert.alert, 'Error', error)
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.LOGIN_REQUEST, authSaga.login),
    takeEvery(types.SIGNUP_REQUEST, authSaga.signup),
    takeEvery(types.FETCH_FAILURE, showErrorAlert),
  ]);
}
