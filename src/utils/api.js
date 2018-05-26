import ifetch from 'isomorphic-fetch';
import { API_HOST } from '../config';

const getHeaders = token => {
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
  return {
    'Content-Type': 'application/json',
    ...authHeaders,
  };
};

function fetch({ url, token, body, params = {} }) {
  const fullURL = `${API_HOST}${url}`;
  const options = {
    method: 'GET',
    headers: getHeaders(token),
    ...params,
  };
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }
  return ifetch(fullURL, options).then(r => r.json());
}

function signup(body) {
  return fetch({ url: '/signup', body, params: { method: 'POST' } });
}

function login(body) {
  return fetch({ url: '/login', body, params: { method: 'POST' } });
}

function logout() {
  return fetch({ url: '/logout' });
}

function receiveAuth(token) {
  return fetch({ url: '/users/me', token });
}

function fetchMyChats(token) {
  return fetch({ url: '/chats/my', token });
}

function fetchAllChats(token) {
  return fetch({ url: '/chats', token });
}

function fetchChat({ token, chatId }) {
  return fetch({ url: `/chats/${chatId}`, token });
}

function createChat({ token, data }) {
  return fetch({ url: `/chats`, token, body: { data }, params: { method: 'POST' } });
}

export default {
  signup,
  login,
  logout,
  receiveAuth,
  fetchMyChats,
  fetchAllChats,
  fetchChat,
  createChat,
};
