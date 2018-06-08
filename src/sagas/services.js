import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import types from '../types';

export function* redirectTo({ payload }) {
  yield put(push(payload.to));
}

export default [takeLatest(types.REDIRECT, redirectTo)];
