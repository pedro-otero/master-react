import { buildReducer, set } from 'state/base/reducers';

export const LOGOUT = 'LOGOUT';
export const PARSE_TOKEN = 'PARSE_TOKEN';

export function parseToken(hash) {
  const pairs = hash.substring(1).split('&').map(pair => pair.split('='));
  const token = pairs.filter(pair => pair[0] === 'access_token')[0][1];
  const expiresIn = pairs.filter(pair => pair[0] === 'expires_in')[0][1];
  const expiry = new Date(Date.now() + (expiresIn * 1000)).toISOString();
  return { type: PARSE_TOKEN, data: { token, expiry } };
}

export function setToken(token, expiry) {
  return { type: PARSE_TOKEN, data: { token, expiry } };
}

export function logout() {
  return { type: LOGOUT };
}

export const reduce = buildReducer([
  [PARSE_TOKEN, set()],
]);
