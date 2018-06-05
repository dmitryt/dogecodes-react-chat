import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import types from '../types';

export function* redirectTo({ payload }) {
  yield put(push(payload.to));
}

export default [
  takeEvery(types.REDIRECT, redirectTo),
];
