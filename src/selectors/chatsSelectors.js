import { createSelector } from 'reselect';

export const getActiveChat = createSelector(
  state => state.chats.activeId,
  state => state.chats._store,
  (id, store) => store[id] || null
);

const getChatsByIds = (ids, store) => ids.map(id => store[id]);

export const getAllChats = createSelector(
  state => state.chats.allIds,
  state => state.chats._store,
  getChatsByIds
);

export const getMyChats = createSelector(
  state => state.chats.myIds,
  state => state.chats._store,
  getChatsByIds
);
