import types from '../types';

export const actions = {
  initWsConnection: () => ({ type: types.WS_CONNECTION_REQUEST }),
  wsConnectionSuccess: () => ({ type: types.WS_CONNECTION_SUCCESS }),
  wsConnectionFailure: error => ({ type: types.WS_CONNECTION_FAILURE, error }),
  wsConnectionClose: () => ({ type: types.WS_CONNECTION_CLOSE }),
  wsConnectionReconnect: () => ({ type: types.WS_CONNECTION_RECONNECT }),
  receiveMessage: payload => ({ type: types.WS_RECEIVE_MESSAGE, payload }),
  receiveNewChat: payload => ({ type: types.WS_RECEIVE_NEW_CHAT, payload }),
  receiveDeletedChat: payload => ({ type: types.WS_RECEIVE_DELETED_CHAT, payload }),

  sendMessage: payload => ({ type: types.WS_SEND_MESSAGE_REQUEST, payload }),
  mountChat: payload => ({ type: types.WS_MOUNT_CHAT, payload }),
  unmountChat: payload => ({ type: types.WS_UNMOUNT_CHAT, payload }),
};
