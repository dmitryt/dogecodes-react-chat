import { combineReducers } from 'redux';

import types from '../types';

export const actions = {
  fetchMyChats: () => ({ type: types.FETCH_MY_CHATS_REQUEST }),
  fetchAllChats: () => ({ type: types.FETCH_ALL_CHATS_REQUEST }),
  createChat: payload => ({ type: types.CREATE_CHAT_REQUEST, payload }),
  deleteChat: () => ({ type: types.DELETE_CHAT_REQUEST }),
  joinChat: payload => ({ type: types.JOIN_CHAT_REQUEST, payload }),
  leaveChat: payload => ({ type: types.LEAVE_CHAT_REQUEST, payload }),
  setActiveChat: payload => ({ type: types.FETCH_ACTIVE_CHAT_REQUEST, payload }),
  redirectToChat: ({ chatId }) => ({ type: types.REDIRECT, payload: { to: `/chats/${chatId}` } }),
  redirectToChatsList: () => ({ type: types.REDIRECT, payload: { to: '/chats' } }),
};

const getChatId = chat => chat._id;

const initialState = {
  activeChat: null,
  allIds: [],
  myIds: [],
  _store: {},
};

function activeChat(state = initialState.activeChat, action) {
  switch (action.type) {
    case types.FETCH_ACTIVE_CHAT_SUCCESS:
      return action.payload;
    case types.WS_RECEIVE_DELETED_CHAT:
      return state && state._id === action.payload.chatId ? null : state;
    case types.DELETE_CHAT_SUCCESS:
    case types.LOGOUT_SUCCESS:
      return null;
    case types.WS_RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
}

function allIds(state = initialState.allIds, action) {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
      return [
        ...state,
        ...action.payload.map(getChatId),
      ];
    case types.WS_RECEIVE_NEW_CHAT:
      return [
        ...state,
        getChatId(action.payload),
      ];
    case types.DELETE_CHAT_SUCCESS:
    case types.WS_RECEIVE_DELETED_CHAT:
      return state.filter(id => id !== action.payload.chatId);
    case types.LOGOUT_SUCCESS:
      return initialState.allIds;
    default:
      return state;
  }
}

function myIds(state = initialState.myIds, action) {
  switch (action.type) {
    case types.FETCH_MY_CHATS_SUCCESS:
      return [
        ...state,
        ...action.payload.map(getChatId),
      ];
    case types.CREATE_CHAT_SUCCESS:
    case types.JOIN_CHAT_SUCCESS:
      return [
        ...state,
        getChatId(action.payload),
      ];
    case types.DELETE_CHAT_SUCCESS:
    case types.LEAVE_CHAT_SUCCESS:
    case types.WS_RECEIVE_DELETED_CHAT:
      return state.filter(id => id !== action.payload.chatId);
    case types.LOGOUT_SUCCESS:
      return initialState.myIds;
    default:
      return state;
  }
}

function _store(state = initialState._store, action) {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
    case types.FETCH_MY_CHATS_SUCCESS:
      return {
        ...state,
        ...action.payload.reduce((acc, chat) => ({
          ...acc,
          [getChatId(chat)]: chat,
        }), {}),
      };
    case types.CREATE_CHAT_SUCCESS:
    case types.WS_RECEIVE_NEW_CHAT:
      return {
        ...state,
        [action.payload._id]: action.payload,
      };
    case types.FETCH_CHAT_SUCCESS:
      return {
        ...state,
        [getChatId(action.payload.chat)]: action.payload.chat,
      };
    case types.DELETE_CHAT_SUCCESS:
    case types.WS_RECEIVE_DELETED_CHAT:
      return Object.keys(state).reduce((acc, id) => (
        id === action.payload.chatId ? acc : { ...acc, [id]: state[id] }
      ), {});
    case types.LOGOUT_SUCCESS:
      return initialState._store;
    default:
      return state;
  }
}

export default combineReducers({
  activeChat,
  allIds,
  myIds,
  _store,
});
