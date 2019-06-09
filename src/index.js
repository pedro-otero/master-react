import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import configureStore from 'state/store';

import Root from './components/root';
import { parseToken, setToken } from 'state/user';
import SpotifyCustomApiFactory from './api/spotify';

import './index.css';

const CustomApi = SpotifyCustomApiFactory(SpotifyWebApi, window.location);
const spotifyApi = CustomApi({
  redirectUri: window.location.origin,
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  throttle: process.env.REACT_APP_SPOTIFY_THROTTLE,
});

const store = configureStore(spotifyApi);
if (window.location.hash) {
  const tokenAction = parseToken(window.location.hash);
  window.history.pushState({}, '', '/');
  store.dispatch(tokenAction);
  const { data: { token, expiry } } = tokenAction;
  localStorage.setItem('token', token);
  localStorage.setItem('expiry', expiry);
} else {
  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('expiry');
  store.dispatch(setToken(token, expiry));
}

registerServiceWorker();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root redirectUri={window.location.origin} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
