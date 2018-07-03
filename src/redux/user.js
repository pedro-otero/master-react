export function setToken(hash) {
  const pairs = hash.substring(1).split('&').map(pair => pair.split('='));
  const token = pairs.filter(pair => pair[0] === 'access_token')[0][1];
  const expiresIn = pairs.filter(pair => pair[0] === 'expires_in')[0][1];
  const expiry = new Date(Date.now() + (expiresIn * 1000)).toISOString();
  return { type: 'SET_TOKEN', data: { token, expiry } };
}

export function logout() {
  return { type: 'LOGOUT' };
}

export function reduce(state = {}, { type, data }) {
  switch (type) {
    case 'SET_TOKEN': {
      const { token, expiry } = data;
      return Object.assign({}, state, { token, expiry });
    }
    case 'LOGOUT': {
      return {};
    }
  }
  return state;
}
