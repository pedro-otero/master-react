export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const PARSE_TOKEN = 'PARSE_TOKEN';

export function parseToken(hash) {
  const pairs = hash.substring(1).split('&').map(pair => pair.split('='));
  const token = pairs.filter(pair => pair[0] === 'access_token')[0][1];
  const expiresIn = pairs.filter(pair => pair[0] === 'expires_in')[0][1];
  const expiry = new Date(Date.now() + (expiresIn * 1000)).toISOString();
  return { type: PARSE_TOKEN, data: { token, expiry } };
}

export function logout() {
  return { type: LOGOUT };
}

export function reduce(state = {}, { type, data }) {
  switch (type) {
    case PARSE_TOKEN: {
      const { token, expiry } = data;
      return Object.assign({}, state, { token, expiry });
    }
    case LOGOUT: {
      return {};
    }
  }
  return state;
}
