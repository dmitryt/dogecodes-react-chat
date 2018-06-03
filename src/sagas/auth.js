import { put, call, select, takeEvery } from 'redux-saga/effects';

import types from '../types';
import { api } from '../utils';
import { STORAGE_KEY_TOKEN } from '../config';

const updateToken = token => {
  localStorage.setItem(STORAGE_KEY_TOKEN, token);
};

export function* login({ data }) {
  try {
    const json = yield call(api.login, data);
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.LOGIN_SUCCESS, payload: json });
    updateToken(json.token);
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export function* signup({ data }) {
  try {
    const json = yield call(api.signup, data);
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.SIGNUP_SUCCESS, payload: json });
    updateToken(json.token);
  } catch (error) {
    yield put({ type: types.SIGNUP_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export function* logout() {
  try {
    const json = yield call(api.logout);
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.LOGOUT_SUCCESS });
    updateToken('');
  } catch (error) {
    yield put({ type: types.LOGOUT_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export function* receiveAuth() {
  try {
    const { auth } = yield select();
    if (!auth.token) {
      return yield put({ type: types.RECEIVE_AUTH_FAILURE });
    }
    const payload = yield call(api.receiveAuth, [auth.token]);
    yield put({ type: types.RECEIVE_AUTH_SUCCESS, payload });
  } catch (error) {
    yield put({ type: types.RECEIVE_AUTH_FAILURE });
  }
}

export function* updateUser({ data }) {
  try {
    const { auth } = yield select();
    if (!auth.token) {
      return yield put({ type: types.UPDATE_USER_FAILURE });
    }
    const payload = yield call(api.updateUser, { data, token: auth.token });
    yield put({ type: types.UPDATE_USER_SUCCESS, payload });
    const notificationData = { level: 'success', message: 'Profile has been updated successfully' };
    yield put({ type: types.NOTIFICATION, data: notificationData });
  } catch (error) {
    yield put({ type: types.UPDATE_USER_FAILURE });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export default [
  takeEvery(types.LOGIN_REQUEST, login),
  takeEvery(types.SIGNUP_REQUEST, signup),
  takeEvery(types.LOGOUT_REQUEST, logout),
  takeEvery(types.RECEIVE_AUTH_REQUEST, receiveAuth),
  takeEvery(types.UPDATE_USER_REQUEST, updateUser),
];
