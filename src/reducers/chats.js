import types from '../types/chats';

export const actions = {
  fetchMyChats: () => ({ type: types.FETCH_MY_CHATS_REQUEST }),
  fetchAllChats: () => ({ type: types.FETCH_ALL_CHATS_REQUEST }),
  createChat: data => ({ type: types.CREATE_CHAT_REQUEST, data }),
};

const initialState = {
};

export default function chatsReducer(state = initialState, action) {
  return state;
}
