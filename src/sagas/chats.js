import { put, call, takeLatest, select } from 'redux-saga/effects';

import types from '../types';
import { api } from '../utils';

export function* fetchMyChats({ payload }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.fetchMyChats, auth.token);
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.FETCH_MY_CHATS_SUCCESS, payload: json.chats });
  } catch (error) {
    yield put({ type: types.FETCH_MY_CHATS_FAILURE, error });

    const payload = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, payload });
  }
}

export function* fetchAllChats({ payload }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.fetchAllChats, auth.token);
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.FETCH_ALL_CHATS_SUCCESS, payload: json.chats });
  } catch (error) {
    yield put({ type: types.FETCH_ALL_CHATS_FAILURE, error });

    const payload = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, payload });
  }
}

export function* createChat({ payload }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.createChat, { payload, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.CREATE_CHAT_SUCCESS, payload: json.chat });
    const notificationpayload = { level: 'success', message: 'Chat has been created successfully' };
    yield put({ type: types.NOTIFICATION, payload: notificationpayload });
  } catch (error) {
    yield put({ type: types.CREATE_CHAT_FAILURE, error });

    const payload = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, payload });
  }
}

export function* deleteChat() {
  try {
    const { auth, chats } = yield select();
    const chatId = chats.activeChat._id;
    const json = yield call(api.deleteChat, { chatId, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.DELETE_CHAT_SUCCESS, payload: { chatId } });
    const data = { level: 'success', message: 'Chat has been deleted successfully' };
    yield put({ type: types.NOTIFICATION, payload: data });
  } catch (error) {
    yield put({ type: types.DELETE_CHAT_FAILURE, error });

    const payload = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, payload });
  }
}

export function* fetchChat({ payload }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.fetchChat, { chatId: payload.chatId, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.FETCH_ACTIVE_CHAT_SUCCESS, payload: json.chat });
  } catch (error) {
    yield put({ type: types.FETCH_ACTIVE_CHAT_FAILURE, error });

    const payload = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, payload });
  }
}

export function* joinChat() {
  try {
    const { auth, chats } = yield select();
    const chatId = chats.activeChat._id;
    const json = yield call(api.joinChat, { chatId, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.JOIN_CHAT_SUCCESS, payload: json.chat });
    yield fetchChat({ payload: { chatId } });
    const data = { level: 'success', message: 'You have joined the chat successfully' };
    yield put({ type: types.NOTIFICATION, payload: data });
  } catch (error) {
    yield put({ type: types.JOIN_CHAT_FAILURE, error });

    const payload = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, payload });
  }
}

export function* leaveChat() {
  try {
    const { auth, chats } = yield select();
    const chatId = chats.activeChat._id;
    const json = yield call(api.leaveChat, { chatId, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.LEAVE_CHAT_SUCCESS, payload: { chatId } });
    yield fetchChat({ payload: { chatId } });
    const data = { level: 'success', message: 'You have left the chat successfully' };
    yield put({ type: types.NOTIFICATION, payload: data });
  } catch (error) {
    yield put({ type: types.LEAVE_CHAT_FAILURE, error });

    const payload = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, payload });
  }
}

export function* sendMessage({ payload }) {
  try {
    const { auth, chats } = yield select();
    const chatId = chats.activeChat._id;
    const json = yield call(api.sendMessage, { payload, chatId, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.SEND_MESSAGE_SUCCESS });
  } catch (error) {
    yield put({ type: types.SEND_MESSAGE_FAILURE, error });

    const payload = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, payload });
  }
}

export default [
  takeLatest(types.FETCH_MY_CHATS_REQUEST, fetchMyChats),
  takeLatest(types.FETCH_ALL_CHATS_REQUEST, fetchAllChats),
  takeLatest(types.CREATE_CHAT_REQUEST, createChat),
  takeLatest(types.DELETE_CHAT_REQUEST, deleteChat),
  takeLatest(types.JOIN_CHAT_REQUEST, joinChat),
  takeLatest(types.LEAVE_CHAT_REQUEST, leaveChat),
  takeLatest(types.SEND_MESSAGE_REQUEST, sendMessage),
  takeLatest(types.FETCH_ACTIVE_CHAT_REQUEST, fetchChat),
];
