import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import types from '../types';

export function* redirectTo({ to }) {
  yield put(push(to));
}

const servicesSagas = [
  takeEvery(types.REDIRECT, redirectTo),
];

export default servicesSagas;
