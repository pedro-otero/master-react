import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyWebApi from 'spotify-web-api-node';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';

import SpotifyCustomApiFactory from './api/spotify';
import Backend from './api/backend';
import getUser from './user';

const backend = new Backend();
const user = getUser(SpotifyCustomApiFactory(SpotifyWebApi, window.location));

if (user.isAuthenticated()) {
  ReactDOM.render(<App spotifyApi={user.getApi()} backend={backend}/>, document.getElementById('root'));
  registerServiceWorker();
} else {
  window.location = user.getAuthUrl();
}
