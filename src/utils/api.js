import ifetch from 'isomorphic-fetch';
import config from 'config';

const API_HOST = config.get('API_HOST');

function fetch(url, options = {}) {
  return ifetch(url, options).then(r => r.json());
}

function signup(data) {
  return fetch('/signup', { data });
}

function login(data) {
  return fetch('/login', { data });
}

export default { signup, login };
