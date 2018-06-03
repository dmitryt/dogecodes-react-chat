import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import types from '../types';

export function* redirectTo({ data }) {
  yield put(push(data.to));
}

export default [
  takeEvery(types.REDIRECT, redirectTo),
];
