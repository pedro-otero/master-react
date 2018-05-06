import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyWebApi from 'spotify-web-api-node';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';

import SpotifyCustomApiFactory from './api/spotify';
import Backend from './api/backend';
import getUser from './user';

const CustomSpotifyApi = SpotifyCustomApiFactory(SpotifyWebApi, window.location);

const spotifyApi = CustomSpotifyApi({
  redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
});
const backend = new Backend();
const user = getUser();

if (user.isAuthenticated()) {
  ReactDOM.render(<App {...{ spotifyApi, backend }}/>, document.getElementById('root'));
  registerServiceWorker();
} else {
  window.location = user.getAuthUrl();
}
