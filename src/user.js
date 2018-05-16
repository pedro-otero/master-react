export default (ApiClass, location) => ({
  isAuthenticated: () => {
    if (location.hash) {
      const pairs = location.hash.substring(1).split('&').map(pair => pair.split('='));
      const token = pairs.filter(pair => pair[0] === 'access_token')[0][1];
      const expiresIn = pairs.filter(pair => pair[0] === 'expires_in')[0][1];
      const expiry = new Date(Date.now() + (expiresIn * 1000)).toISOString();
      localStorage.setItem('token', token);
      localStorage.setItem('expiry', expiry);
    }
    const token = localStorage.getItem('token');
    const expiry = new Date(localStorage.getItem('expiry'));
    const now = Date.now();
    const difference = now - expiry.getTime();
    return typeof token !== 'undefined' && difference <= 0;
  },
  getAuthUrl: () => `${process.env.REACT_APP_SPOTIFY_AUTHORIZE_URL}?${[
    ['client_id', process.env.REACT_APP_SPOTIFY_CLIENT_ID],
    ['response_type', 'token'],
    ['redirect_uri', process.env.REACT_APP_SPOTIFY_REDIRECT_URI],
    ['state', 'reactApp'],
    ['scope', process.env.REACT_APP_SPOTIFY_SCOPES],
    ['show_dialog', 'false'],
  ].map(pair => `${pair[0]}=${pair[1]}`).join('&')}`,
  getApi: () => new ApiClass({
    redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
    clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  }),
});
