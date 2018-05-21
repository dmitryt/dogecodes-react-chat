import { put, call } from 'redux-saga/effects';

import { types } from '../reducers';
import { api } from '../utils';

export function* login({ data }) {
  try {
    debugger;
    const payload = yield call(api.login(data));
    // yield put({ type: types.SIGNUP_SUCCESS, payload });
  } catch (error) {
    yield put({ type: types.FETCH_FAILED, error });
  }
}

export function* signup(data) {
  try {
    const payload = yield call(api.signup(data));
    yield put({ type: types.SIGNUP_SUCCESS, payload });
  } catch (error) {
    yield put({ type: types.FETCH_FAILED, error });
  }
}

export default {
  login,
  signup,
}
