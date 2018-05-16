import getUser from './user';

describe('Auth module', () => {
  const emptyHashLocation = {
    hash: '',
    href: 'http://frontend.org',
  };

  it('#isAuthenticated = false when there is a token but it expired', () => {
    global.localStorage = { getItem: jest.fn(key => ({ token: '', expiry: new Date(Date.now() - 1000).toISOString() })[key]) };
    const user = getUser(null, emptyHashLocation);
    expect(user.isAuthenticated()).toEqual(false);
  });

  it('#isAuthenticated = false when there is not a token nor expiry', () => {
    global.localStorage = { getItem: jest.fn() };
    const user = getUser(null, emptyHashLocation);
    expect(user.isAuthenticated()).toEqual(false);
  });

  it('#isAuthenticated = true when there is a token and it has not expired', () => {
    global.localStorage = { getItem: jest.fn(key => ({ token: '', expiry: new Date(Date.now() + 1000).toISOString() })[key]) };
    const user = getUser(null, emptyHashLocation);
    expect(user.isAuthenticated()).toEqual(true);
  });

  describe('location has a hash', () => {
    let isAuthenticated;
    beforeAll(() => {
      global.localStorage = {
        getItem: jest.fn(key => ({ token: '', expiry: new Date(Date.now() + 1000).toISOString() })[key]),
        setItem: jest.fn(),
      };
      const user = getUser(null, { hash: '#access_token=FAKE&token_type=Bearer&expires_in=3600&state=reactApp' });
      isAuthenticated = user.isAuthenticated();
    });

    it('stores token in localStorage', () => {
      expect(global.localStorage.setItem).toHaveBeenCalledWith('token', 'FAKE');
    });

    it('stores expiry in localStorage', () => {
      const now = Date.now();
      const then = new Date(now + 3600000);
      expect(global.localStorage.setItem.mock.calls[1][1].substring(0, 20))
        .toEqual(then.toISOString().substring(0, 20));
    });

    it('#isAuthenticated = true', () => {
      expect(isAuthenticated).toEqual(true);
    });
  });

  it('builds authentication url', () => {
    process.env.REACT_APP_SPOTIFY_CLIENT_ID = 'clientId';
    process.env.REACT_APP_SPOTIFY_AUTHORIZE_URL = 'http://auth.com';
    process.env.REACT_APP_SPOTIFY_SCOPES = 'theScopes';
    const user = getUser(null, emptyHashLocation);
    expect(user.getAuthUrl()).toEqual('http://auth.com?client_id=clientId&response_type=token&redirect_uri=http://frontend.org&state=reactApp&scope=theScopes&show_dialog=false');
  });

  it('constructs an api object', () => {
    const ApiClass = jest.fn();
    const user = getUser(ApiClass, emptyHashLocation);
    user.getApi();
    expect(ApiClass.mock.calls).toEqual([[{
      redirectUri: 'http://frontend.org',
      clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    }]]);
  });
});
