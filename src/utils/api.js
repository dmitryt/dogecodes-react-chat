import ifetch from 'isomorphic-fetch';
import { API_HOST } from '../config';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

const defaultOptions = {
  method: 'GET',
};

function fetch(url, params = {}) {
  const fullURL = `${API_HOST}${url}`;
  const options = {
    ...defaultOptions,
    headers: { ...defaultHeaders, ...(params.headers || {}) },
  };
  if (params.data !== undefined) {
    options.body = JSON.stringify(params.data);
  }
  if (params.method) {
    options.method = params.method;
  }
  return ifetch(fullURL, options).then(r => r.json());
}

function signup(data) {
  return fetch('/signup', { method: 'POST', data });
}

function login(data) {
  return fetch('/login', { method: 'POST', data });
}

function logout(data) {
  return fetch('/logout');
}

function receiveAuth(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return fetch('/users/me', { headers });
}

export default {
  signup,
  login,
  logout,
  receiveAuth,
};
