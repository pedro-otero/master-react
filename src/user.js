export default ApiClass => ({
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const expiry = Number(localStorage.getItem('expiry'));
    const now = new Date().getTime();
    const difference = now - expiry;
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
