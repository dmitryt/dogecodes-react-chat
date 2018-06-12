import { put, call, select, takeLatest } from 'redux-saga/effects';

import types from '../types';
import { api } from '../utils';
import { STORAGE_KEY_TOKEN } from '../config';

const updateToken = (token) => {
  localStorage.setItem(STORAGE_KEY_TOKEN, token);
};

export function* login({ payload }) {
  try {
    const json = yield call(api.login, payload);
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.LOGIN_SUCCESS, payload: json });
    updateToken(json.token);
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, error });

    const notification = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, payload: notification });
  }
}

export function* signup({ payload }) {
  try {
    const json = yield call(api.signup, payload);
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.SIGNUP_SUCCESS, payload: json });
    updateToken(json.token);
  } catch (error) {
    yield put({ type: types.SIGNUP_FAILURE, error });

    const notification = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, payload: notification });
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

    const payload = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, payload });
  }
}

export function* receiveAuth() {
  try {
    const { auth } = yield select();
    if (!auth.token) {
      return yield put({ type: types.RECEIVE_AUTH_FAILURE });
    }
    const payload = yield call(api.receiveAuth, [auth.token]);
    if (!payload.success) {
      return yield put({ type: types.RECEIVE_AUTH_FAILURE });
    }
    yield put({ type: types.RECEIVE_AUTH_SUCCESS, payload });
  } catch (error) {
    yield put({ type: types.RECEIVE_AUTH_FAILURE });
  }
}

export function* updateUser({ payload }) {
  try {
    const { auth } = yield select();
    if (!auth.token) {
      return yield put({ type: types.UPDATE_USER_FAILURE });
    }
    const data = yield call(api.updateUser, { payload, token: auth.token });
    yield put({ type: types.UPDATE_USER_SUCCESS, payload: data });
    const notification = { level: 'success', message: 'Profile has been updated successfully' };
    yield put({ type: types.NOTIFICATION, payload: notification });
  } catch (error) {
    yield put({ type: types.UPDATE_USER_FAILURE });

    const notification = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, payload: notification });
  }
}

export default [
  takeLatest(types.LOGIN_REQUEST, login),
  takeLatest(types.SIGNUP_REQUEST, signup),
  takeLatest(types.LOGOUT_REQUEST, logout),
  takeLatest(types.RECEIVE_AUTH_REQUEST, receiveAuth),
  takeLatest(types.UPDATE_USER_REQUEST, updateUser),
];
