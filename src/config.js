// TODO: Make this param configurable, using https://www.npmjs.com/package/config

export const API_HOST = process.env.API_HOST || 'http://localhost:8000/v1';
export const WS_API_HOST = process.env.WS_API_HOST || 'ws://localhost:8000/';
export const STORAGE_KEY_TOKEN = 'DOGECODES_USER_TOKEN';
