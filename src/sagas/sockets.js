import { eventChannel } from 'redux-saga';
import { all, call, take, takeEvery, fork, cancel, put, select } from 'redux-saga/effects';
import SocketIOClient from 'socket.io-client';

import types from '../types';
import { actions } from '../reducers';
import { WS_API_HOST } from '../config';

function connect(token) {
  const socket = SocketIOClient(WS_API_HOST, { query: { token } });
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('new-message', ({ message }) => {
      emit(actions.receiveMessage(message));
    });
    socket.on('new-chat', ({ chat }) => {
      emit(actions.receiveNewChat(chat));
    });
    socket.on('deleted-chat', ({ chat }) => {
      emit(actions.receiveDeletedChat(chat));
    });

    socket.on('error', () => {

    });
    return () => { };
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
    let action = yield take(channel);
    yield put(action);
  }
}

function promisifyEmit({ socket, key, data }) {
  return new Promise(resolve => {
    socket.emit(key, data, resolve);
  });
}

function getHandlers(socket) {
  return {
    sendMessage: function* ({ payload: content }) {
      const { chats } = yield select();
      const chatId = chats.activeChat && chats.activeChat._id;
      const data = { chatId, content };
      yield call(promisifyEmit, { key: 'send-message', socket, data });
      yield put(actions.sendMessage(data));
    },
    mountChat: function* ({ payload: data }) {
      console.log('MMMMMM', data);
      yield call(promisifyEmit, { key: 'mount-chat', socket, data });
    },
    unmountChat: function* ({ payload: data }) {
      yield call(promisifyEmit, { key: 'unmount-chat', socket, data });
    },
  };
}

function* write(socket) {
  const { sendMessage, mountChat, unmountChat } = getHandlers(socket);
  yield all([
    takeEvery(types.WS_SEND_MESSAGE_REQUEST, sendMessage),
    takeEvery(types.WS_MOUNT_CHAT, mountChat),
    takeEvery(types.WS_UNMOUNT_CHAT, unmountChat),
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
    const task = yield fork(handleIO, socket);

    yield take(types.LOGOUT_SUCCESS);
    yield cancel(task);
    // socket.emit('logout');
  }
}

export default [
  takeEvery(types.WS_CONNECTION_REQUEST, flow),
];
