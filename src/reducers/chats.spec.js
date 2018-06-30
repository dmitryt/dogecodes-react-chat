import { activeChat, allIds, myIds, _store } from './chats';
import types from '../types';

describe('chats reducer', () => {
  describe('activeChat reducer', () => {
    it('should return the initial state', () => {
      expect(activeChat(undefined, {})).toEqual(null);
    });
    it('should handle FETCH_ACTIVE_CHAT_SUCCESS', () => {
      const action = {
        type: types.FETCH_ACTIVE_CHAT_SUCCESS,
        payload: { some: 'payload' },
      };
      expect(activeChat({}, action)).toEqual({ some: 'payload' });
    });
    it('should handle WS_RECEIVE_DELETED_CHAT', () => {
      const action = {
        type: types.WS_RECEIVE_DELETED_CHAT,
        payload: { chatId: '123' },
      };
      expect(activeChat({ _id: '123' }, action)).toEqual(null);
    });
    it('should handle WS_RECEIVE_DELETED_CHAT, if deleted chat is not active chat', () => {
      const action = {
        type: types.WS_RECEIVE_DELETED_CHAT,
        payload: { chatId: '123' },
      };
      expect(activeChat({ _id: '234' }, action)).toEqual({ _id: '234' });
    });
    it('should handle DELETE_CHAT_SUCCESS', () => {
      const action = {
        type: types.DELETE_CHAT_SUCCESS,
      };
      expect(activeChat({ _id: '234' }, action)).toEqual(null);
    });
    it('should handle LOGOUT_SUCCESS', () => {
      const action = {
        type: types.LOGOUT_SUCCESS,
      };
      expect(activeChat({ _id: '234' }, action)).toEqual(null);
    });
    it('should handle WS_RECEIVE_MESSAGE', () => {
      const action = {
        type: types.WS_RECEIVE_MESSAGE,
        payload: { _id: 2, some: 'message' },
      };
      const state = { _id: '123', messages: [{ _id: 1 }] };
      expect(activeChat(state, action)).toEqual({
        _id: '123',
        messages: [{ _id: 1 }, { _id: 2, some: 'message' }],
      });
    });
  });

  describe('allIds reducer', () => {
    it('should return the initial state', () => {
      expect(allIds(undefined, {})).toEqual([]);
    });
    it('should handle FETCH_ALL_CHATS_SUCCESS', () => {
      const action = {
        type: types.FETCH_ALL_CHATS_SUCCESS,
        payload: [{ _id: '123' }, { _id: '234' }, { _id: '345' }],
      };
      expect(allIds([], action)).toEqual(['123', '234', '345']);
    });
    it('should handle WS_RECEIVE_NEW_CHAT', () => {
      const action = {
        type: types.WS_RECEIVE_NEW_CHAT,
        payload: { _id: '345' },
      };
      const state = ['123', '234'];
      expect(allIds(state, action)).toEqual(['123', '234', '345']);
    });
    it('should handle DELETE_CHAT_SUCCESS', () => {
      const action = {
        type: types.DELETE_CHAT_SUCCESS,
        payload: { chatId: '234' },
      };
      const state = ['123', '234', '345'];
      expect(allIds(state, action)).toEqual(['123', '345']);
    });
    it('should handle WS_RECEIVE_DELETED_CHAT', () => {
      const action = {
        type: types.WS_RECEIVE_DELETED_CHAT,
        payload: { chatId: '234' },
      };
      const state = ['123', '234', '345'];
      expect(allIds(state, action)).toEqual(['123', '345']);
    });
    it('should handle LOGOUT_SUCCESS', () => {
      const action = {
        type: types.LOGOUT_SUCCESS,
      };
      const state = ['123', '234', '345'];
      expect(allIds(state, action)).toEqual([]);
    });
  });

  describe('myIds reducer', () => {
    it('should return the initial state', () => {
      expect(myIds(undefined, {})).toEqual([]);
    });
    it('should handle FETCH_MY_CHATS_SUCCESS', () => {
      const action = {
        type: types.FETCH_MY_CHATS_SUCCESS,
        payload: [{ _id: '123' }, { _id: '234' }, { _id: '345' }],
      };
      expect(myIds([], action)).toEqual(['123', '234', '345']);
    });
    it('should handle CREATE_CHAT_SUCCESS', () => {
      const action = {
        type: types.CREATE_CHAT_SUCCESS,
        payload: { _id: '345' },
      };
      const state = ['123', '234'];
      expect(myIds(state, action)).toEqual(['123', '234', '345']);
    });
    it('should handle JOIN_CHAT_SUCCESS', () => {
      const action = {
        type: types.JOIN_CHAT_SUCCESS,
        payload: { _id: '345' },
      };
      const state = ['123', '234'];
      expect(myIds(state, action)).toEqual(['123', '234', '345']);
    });
    it('should handle DELETE_CHAT_SUCCESS', () => {
      const action = {
        type: types.DELETE_CHAT_SUCCESS,
        payload: { chatId: '234' },
      };
      const state = ['123', '234', '345'];
      expect(myIds(state, action)).toEqual(['123', '345']);
    });
    it('should handle WS_RECEIVE_DELETED_CHAT', () => {
      const action = {
        type: types.WS_RECEIVE_DELETED_CHAT,
        payload: { chatId: '234' },
      };
      const state = ['123', '234', '345'];
      expect(myIds(state, action)).toEqual(['123', '345']);
    });
    it('should handle LEAVE_CHAT_SUCCESS', () => {
      const action = {
        type: types.LEAVE_CHAT_SUCCESS,
        payload: { chatId: '234' },
      };
      const state = ['123', '234', '345'];
      expect(myIds(state, action)).toEqual(['123', '345']);
    });
    it('should handle LOGOUT_SUCCESS', () => {
      const action = {
        type: types.LOGOUT_SUCCESS,
      };
      const state = ['123', '234', '345'];
      expect(myIds(state, action)).toEqual([]);
    });
  });

  describe('_store reducer', () => {
    it('should return the initial state', () => {
      expect(_store(undefined, {})).toEqual({});
    });
    it('should handle FETCH_ALL_CHATS_SUCCESS', () => {
      const action = {
        type: types.FETCH_ALL_CHATS_SUCCESS,
        payload: [{ _id: '123' }, { _id: '234' }, { _id: '345' }],
      };
      expect(_store({}, action)).toEqual({
        123: { _id: '123' },
        234: { _id: '234' },
        345: { _id: '345' },
      });
    });
    it('should handle FETCH_MY_CHATS_SUCCESS', () => {
      const action = {
        type: types.FETCH_MY_CHATS_SUCCESS,
        payload: [{ _id: '123' }, { _id: '234' }, { _id: '345' }],
      };
      expect(_store({}, action)).toEqual({
        123: { _id: '123' },
        234: { _id: '234' },
        345: { _id: '345' },
      });
    });
    it('should handle CREATE_CHAT_SUCCESS', () => {
      const action = {
        type: types.CREATE_CHAT_SUCCESS,
        payload: { _id: '234' },
      };
      const state = {
        123: { _id: '123' },
        345: { _id: '345' },
      };
      expect(_store(state, action)).toEqual({
        123: { _id: '123' },
        234: { _id: '234' },
        345: { _id: '345' },
      });
    });
    it('should handle WS_RECEIVE_NEW_CHAT', () => {
      const action = {
        type: types.WS_RECEIVE_NEW_CHAT,
        payload: { _id: '234' },
      };
      const state = {
        123: { _id: '123' },
        345: { _id: '345' },
      };
      expect(_store(state, action)).toEqual({
        123: { _id: '123' },
        234: { _id: '234' },
        345: { _id: '345' },
      });
    });
    it('should handle DELETE_CHAT_SUCCESS', () => {
      const action = {
        type: types.DELETE_CHAT_SUCCESS,
        payload: { chatId: '234' },
      };
      const state = {
        123: { _id: '123' },
        234: { _id: '234' },
        345: { _id: '345' },
      };
      expect(_store(state, action)).toEqual({
        123: { _id: '123' },
        345: { _id: '345' },
      });
    });
    it('should handle WS_RECEIVE_DELETED_CHAT', () => {
      const action = {
        type: types.WS_RECEIVE_DELETED_CHAT,
        payload: { chatId: '234' },
      };
      const state = {
        123: { _id: '123' },
        234: { _id: '234' },
        345: { _id: '345' },
      };
      expect(_store(state, action)).toEqual({
        123: { _id: '123' },
        345: { _id: '345' },
      });
    });
    it('should handle LOGOUT_SUCCESS', () => {
      const action = {
        type: types.LOGOUT_SUCCESS,
      };
      const state = {
        123: { _id: '123' },
        234: { _id: '234' },
        345: { _id: '345' },
      };
      expect(_store(state, action)).toEqual({});
    });
  });
});
