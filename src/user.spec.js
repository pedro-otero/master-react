import getUser from './user';

describe('Auth module', () => {
  it('#isAuthenticated = false when there is a token but it expired', () => {
    global.localStorage = { getItem: jest.fn(key => ({ token: '', expiry: '0' })[key]) };
    const user = getUser();
    expect(user.isAuthenticated()).toEqual(false);
  });

  it('#isAuthenticated = false when there is not a token nor expiry', () => {
    global.localStorage = { getItem: jest.fn() };
    const user = getUser();
    expect(user.isAuthenticated()).toEqual(false);
  });

  it('#isAuthenticated = true when there is a token and it has not expired', () => {
    global.localStorage = { getItem: jest.fn(key => ({ token: '', expiry: String(new Date().getTime() + 1000) })[key]) };
    const user = getUser();
    expect(user.isAuthenticated()).toEqual(true);
  });

  it('builds authentication url', () => {
    process.env.REACT_APP_SPOTIFY_CLIENT_ID = 'clientId';
    process.env.REACT_APP_SPOTIFY_AUTHORIZE_URL = 'http://auth.com';
    process.env.REACT_APP_SPOTIFY_REDIRECT_URI = 'http://frontend.org';
    process.env.REACT_APP_SPOTIFY_SCOPES = 'theScopes';
    const user = getUser();
    expect(user.getAuthUrl()).toEqual('http://auth.com?client_id=clientId&response_type=token&redirect_uri=http://frontend.org&state=reactApp&scope=theScopes&show_dialog=false');
  });
});
