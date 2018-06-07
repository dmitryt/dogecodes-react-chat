import { eventChannel } from 'redux-saga';
import { all, call, take, takeLatest, fork, put, select } from 'redux-saga/effects';
import SocketIOClient from 'socket.io-client';

import types from '../types';
import { actions } from '../reducers';
import { WS_API_HOST } from '../config';

function connect(token) {
  const socket = SocketIOClient(WS_API_HOST, { query: { token } });
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel((emit) => {
    socket.on('new-message', ({ message }) => {
      emit(actions.receiveMessage(message));
    });
    socket.on('new-chat', ({ chat }) => {
      emit(actions.receiveNewChat(chat));
    });
    socket.on('deleted-chat', ({ chat }) => {
      emit(actions.receiveDeletedChat({ chatId: chat._id }));
    });
    socket.on('error', (error) => {
      emit(actions.wsConnectionFailure());
      emit(actions.notify({ level: 'error', message: error.message }));
    });
    socket.on('connect_error', () => {
      emit(actions.wsConnectionFailure());
      emit(actions.notify({ level: 'error', message: 'Connection has been lost' }));
    });
    socket.on('reconnect', () => {
      emit(actions.wsConnectionReconnect());
      emit(actions.notify({ level: 'success', message: 'Connection has been established' }));
    });
    return () => {};
  });
}

function* read(socket) {
  let channel;
  try {
    channel = yield call(subscribe, socket);
  } catch (error) {
    yield put(actions.wsConnectionFailure(error));
  }
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function promisifyEmit({ socket, key, payload }) {
  return new Promise((resolve) => {
    socket.emit(key, payload, resolve);
  });
}

function getHandlers(socket) {
  return {
    * sendMessage({ payload: content }) {
      const { chats } = yield select();
      const chatId = chats.activeChat && chats.activeChat._id;
      const payload = { chatId, content };
      yield call(promisifyEmit, { key: 'send-message', socket, payload });
      yield put(actions.sendMessage(payload));
    },
    * mountChat({ payload }) {
      yield call(promisifyEmit, { key: 'mount-chat', socket, payload });
    },
    * unmountChat({ payload }) {
      yield call(promisifyEmit, { key: 'unmount-chat', socket, payload });
    },
  };
}

function* write(socket) {
  const { sendMessage, mountChat, unmountChat } = getHandlers(socket);
  yield all([
    takeLatest(types.WS_SEND_MESSAGE_REQUEST, sendMessage),
    takeLatest(types.WS_MOUNT_CHAT, mountChat),
    takeLatest(types.WS_UNMOUNT_CHAT, unmountChat),
  ]);
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  while (true) {
    const { auth } = yield select();
    const socket = yield call(connect, auth.token);
    yield put(actions.wsConnectionSuccess());
    yield fork(handleIO, socket);

    const { chats } = yield select();
    if (chats.activeChat) {
      yield put(actions.mountChat(chats.activeChat._id));
    }
    yield take(types.WS_CONNECTION_CLOSE);
    socket.disconnect();
  }
}

export default [
  takeLatest(types.WS_CONNECTION_REQUEST, flow),
];
