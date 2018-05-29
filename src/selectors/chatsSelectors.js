import { createSelector } from 'reselect';

export const getActiveChat = createSelector(
  state => state.chats.allIds,
  state => state.chats.activeId,
  (allIds, activeId) => {
    if (!activeId) {
      return null;
    }
    return allIds.find(chat => chat._id === activeId);
  }
);
