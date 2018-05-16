import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import request from 'superagent';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';

import SpotifyCustomApiFactory from './api/spotify';
import getBackend from './api/backend';
import getUser from './user';

const Backend = getBackend(request, `${process.env.REACT_APP_BE_DOMAIN}/data/album`, 1000);
const backend = new Backend();
const user = getUser(SpotifyCustomApiFactory(SpotifyWebApi, window.location), window.location);

if (user.isAuthenticated()) {
  ReactDOM.render(
    <App
        spotifyApi={user.getApi()}
        backend={backend} />,
    document.getElementById('root'),
  );
  registerServiceWorker();
} else {
  window.location = user.getAuthUrl();
}
