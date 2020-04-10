import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import Welcome from 'components/Welcome';
import registerServiceWorker from './registerServiceWorker';
import getSpotifyAxiosInstance from './api/spotify';
import Root from './components/root';
import GlobalAppContext from './context';
import './index.css';
import makeGetRelease from './data/get-release';

function parseToken(hash) {
  const pairs = hash.substring(1).split('&').map(pair => pair.split('='));
  const token = pairs.filter(pair => pair[0] === 'access_token')[0][1];
  const expiresIn = pairs.filter(pair => pair[0] === 'expires_in')[0][1];
  const expiry = new Date(Date.now() + (expiresIn * 1000)).toISOString();
  return { token, expiry };
}

const getAuthUrl = () => `${process.env.REACT_APP_SPOTIFY_AUTHORIZE_URL}?${[
  ['client_id', process.env.REACT_APP_SPOTIFY_CLIENT_ID],
  ['response_type', 'token'],
  ['redirect_uri', window.location.origin],
  ['state', 'reactApp'],
  ['scope', process.env.REACT_APP_SPOTIFY_SCOPES],
  ['show_dialog', 'false'],
].map(([key, value]) => `${key}=${value}`).join('&')}`;

function startAuthenticatedApp(token) {
  registerServiceWorker();
  const contextData = {
    spotify: getSpotifyAxiosInstance(axios, token, process.env.REACT_APP_SPOTIFY_THROTTLE),
    observeAlbumSearch: makeGetRelease(axios.create({
      baseURL: process.env.REACT_APP_BE_DOMAIN,
    }), 1000),
    GET_RELEASE_THROTTLE: 1000,
  };
  ReactDOM.render(
    <BrowserRouter>
      <GlobalAppContext.Provider value={contextData}>
        <Root />
      </GlobalAppContext.Provider>
    </BrowserRouter>,
    document.getElementById('root'),
  );
}

const token = localStorage.getItem('token');
const expiry = localStorage.getItem('expiry');

if (!token && !expiry && !window.location.hash) {
  ReactDOM.render(<Welcome loginUrl={getAuthUrl()} />, document.getElementById('root'));
} else if (window.location.hash) {
  const tokenAction = parseToken(window.location.hash);
  window.history.pushState({}, '', '/');
  localStorage.setItem('token', tokenAction.token);
  localStorage.setItem('expiry', tokenAction.expiry);
  startAuthenticatedApp(tokenAction.token);
} else if (token) {
  startAuthenticatedApp(token);
} else {
  throw Error('Cannot figure out authentication state');
}
