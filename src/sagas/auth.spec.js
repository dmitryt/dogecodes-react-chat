import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { api } from '../utils';
import types from '../types';
import { login, signup, logout, receiveAuth, updateUser } from './auth';
import { STORAGE_KEY_TOKEN } from '../config';

describe('auth sagas', () => {
  it('should login user correctly', () => {
    const payload = { username: 'john', password: '123' };
    const expectedResponse = { success: true, token: 'some-socket' };
    expectSaga(login, { payload })
      .provide([[matchers.call.fn(api.login), expectedResponse]])
      .put({ type: types.LOGIN_SUCCESS, payload: { success: true, token: 'some-socket' } })
      .run();
    expect(localStorage.setItem).toHaveBeenLastCalledWith(STORAGE_KEY_TOKEN, 'some-socket');
  });
  it('should signup user correctly', () => {
    const payload = { username: 'john', password: '123' };
    const expectedResponse = { success: true, token: 'some-socket' };
    expectSaga(signup, { payload })
      .provide([[matchers.call.fn(api.signup), expectedResponse]])
      .put({ type: types.SIGNUP_SUCCESS, payload: { success: true, token: 'some-socket' } })
      .run();
    expect(localStorage.setItem).toHaveBeenLastCalledWith(STORAGE_KEY_TOKEN, 'some-socket');
  });
  it('should logout user correctly', () => {
    const expectedResponse = { success: true, token: 'some-socket' };
    expectSaga(logout)
      .provide([[matchers.call.fn(api.logout), expectedResponse]])
      .put({ type: types.LOGOUT_SUCCESS })
      .run();
    expect(localStorage.setItem).toHaveBeenLastCalledWith(STORAGE_KEY_TOKEN, '');
  });
  it('should receiveAuth for user correctly', () => {
    const expectedResponse = { user: { _id: 1 } };
    expectSaga(receiveAuth)
      .withState({ auth: { token: '123' } })
      .provide([[matchers.call.fn(api.receiveAuth), expectedResponse]])
      .put({ type: types.RECEIVE_AUTH_SUCCESS, payload: { user: { _id: 1 } } })
      .run();
  });
  it('should updateUser correctly', () => {
    const payload = { firstName: '123', lastName: '234', username: 'john' };
    const expectedResponse = {
      _id: 1,
      firstName: '123',
      lastName: '234',
      username: 'john',
    };
    expectSaga(updateUser, { payload })
      .withState({ auth: { token: '123' } })
      .provide([[matchers.call.fn(api.updateUser), expectedResponse]])
      .put({ type: types.UPDATE_USER_SUCCESS, payload: expectedResponse })
      .run();
  });
});
