import { put, call, takeEvery, select } from 'redux-saga/effects';

import types from '../types/chats';
import { api } from '../utils';

export function* fetchMyChats({ data }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.fetchMyChats, auth.token);
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.FETCH_MY_CHATS_SUCCESS, payload: json });
  } catch (error) {
    yield put({ type: types.FETCH_MY_CHATS_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export function* fetchAllChats({ data }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.fetchAllChats, auth.token);
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.FETCH_ALL_CHATS_SUCCESS, payload: json });
  } catch (error) {
    yield put({ type: types.FETCH_ALL_CHATS_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export function* fetchChat({ data }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.fetchChat, { chatId: data.chatId, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.FETCH_CHAT_SUCCESS, payload: json });
  } catch (error) {
    yield put({ type: types.FETCH_CHAT_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export function* createChat({ data }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.createChat, { data, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.CREATE_CHAT_SUCCESS, payload: json });
  } catch (error) {
    yield put({ type: types.CREATE_CHAT_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

const chatSagas = [
  takeEvery(types.FETCH_MY_CHATS_REQUEST, fetchMyChats),
  takeEvery(types.FETCH_ALL_CHATS_REQUEST, fetchAllChats),
  takeEvery(types.FETCH_CHAT_REQUEST, fetchChat),
  takeEvery(types.CREATE_CHAT_REQUEST, createChat),
];

export default chatSagas;
