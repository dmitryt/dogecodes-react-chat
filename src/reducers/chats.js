import { combineReducers } from 'redux';

import types from '../types/chats';

export const actions = {
  fetchMyChats: () => ({ type: types.FETCH_MY_CHATS_REQUEST }),
  fetchAllChats: () => ({ type: types.FETCH_ALL_CHATS_REQUEST }),
  createChat: data => ({ type: types.CREATE_CHAT_REQUEST, data }),
  deleteChat: data => ({ type: types.DELETE_CHAT_REQUEST, data }),
  joinChat: data => ({ type: types.JOIN_CHAT_REQUEST, data }),
  leaveChat: data => ({ type: types.LEAVE_CHAT_REQUEST, data }),
  sendMessage: data => ({ type: types.SEND_MESSAGE_REQUEST, data }),
  setActiveChat: data => ({ type: types.SET_ACTIVE_CHAT, data }),
};

const initialState = {
  activeId: null,
  allIds: [],
  myIds: [],
};

function activeId(state = initialState.activeId, action) {
  switch (action.type) {
    case types.SET_ACTIVE_CHAT:
      return action.data.chatId;
    case types.LEAVE_CHAT_SUCCESS:
    case types.DELETE_CHAT_SUCCESS:
    case types.UNSET_ACTIVE_CHAT:
      return null;
    default:
      return state;
  }
}

function allIds(state = initialState.allIds, action) {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
      return [
        ...state,
        ...action.payload
      ];
    case types.FETCH_ALL_CHATS_FAILURE:
      return [];
    default:
      return state;
  }
}

function myIds(state = initialState.myIds, action) {
  switch (action.type) {
    case types.FETCH_MY_CHATS_SUCCESS:
      return [
        ...state,
        ...action.payload
      ];
    case types.FETCH_MY_CHATS_FAILURE:
      return [];
    default:
      return state;
  }
}

export default combineReducers({
  activeId,
  allIds,
  myIds,
});
