import SpotifyCustomApiFactory from './api/spotify';

export default (ApiClass, window) => ({
  saveToken(hash) {
    const pairs = hash.substring(1).split('&').map(pair => pair.split('='));
    const token = pairs.filter(pair => pair[0] === 'access_token')[0][1];
    const expiresIn = pairs.filter(pair => pair[0] === 'expires_in')[0][1];
    const expiry = new Date(Date.now() + (expiresIn * 1000)).toISOString();
    localStorage.setItem('token', token);
    localStorage.setItem('expiry', expiry);
  },
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const expiry = new Date(localStorage.getItem('expiry'));
    const now = Date.now();
    const difference = now - expiry.getTime();
    return typeof token !== 'undefined' && difference <= 0;
  },
  isNew: () => {
    const token = localStorage.getItem('token');
    const expiry = new Date(localStorage.getItem('expiry'));
    return !token && !expiry;
  },
  getAuthUrl: () => `${process.env.REACT_APP_SPOTIFY_AUTHORIZE_URL}?${[
    ['client_id', process.env.REACT_APP_SPOTIFY_CLIENT_ID],
    ['response_type', 'token'],
    ['redirect_uri', window.location.origin],
    ['state', 'reactApp'],
    ['scope', process.env.REACT_APP_SPOTIFY_SCOPES],
    ['show_dialog', 'false'],
  ].map(pair => `${pair[0]}=${pair[1]}`).join('&')}`,
  getApi: () => {
    const CustomApi = SpotifyCustomApiFactory(ApiClass, window.location);
    return CustomApi({
      redirectUri: window.location.origin,
      clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    });
  },
});
