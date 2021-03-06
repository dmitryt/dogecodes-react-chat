import { createSelector } from 'reselect';

const getChatsByIds = (ids, store) => ids.map(id => store[id]);
const isUserMember = (chat, user) => chat.members.map(m => m._id).includes(user._id);
const isMemberFn = (chat, user) => Boolean(user && chat && isUserMember(chat, user));
const isCreatorFn = (chat, user) => Boolean(user && chat && chat.creator._id === user._id);

export const getAllChats = createSelector(
  state => state.chats.allIds,
  state => state.chats._store,
  getChatsByIds,
);

export const getMyChats = createSelector(
  state => state.chats.myIds,
  state => state.chats._store,
  getChatsByIds,
);

export const isMember = createSelector(
  state => state.chats.activeChat,
  state => state.auth.user,
  isMemberFn,
);

export const isCreator = createSelector(
  state => state.chats.activeChat,
  state => state.auth.user,
  isCreatorFn,
);

export const isChatMember = createSelector(
  state => state.chats.activeChat,
  state => state.auth.user,
  (...args) => isMemberFn(...args) || isCreatorFn(...args),
);
