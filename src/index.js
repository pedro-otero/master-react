import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyWebApi from 'spotify-web-api-node';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';


import SpotifyCustomApiFactory from './api/spotify';
import Backend from './api/backend';

const CustomSpotifyApi = SpotifyCustomApiFactory(SpotifyWebApi, window.location);

const spotifyApi = new CustomSpotifyApi({
  redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
});
const backend = new Backend();

const token = localStorage.getItem('token');
const expiry = localStorage.getItem('expiry');
const now = new Date().getTime();
const difference = now - expiry;
if (token && difference <= 0) {
  ReactDOM.render(<App {...{ spotifyApi, backend }}/>, document.getElementById('root'));
  registerServiceWorker();
} else {
  window.location = `${process.env.REACT_APP_SPOTIFY_AUTHORIZE_URL}?${[
    ['client_id', process.env.REACT_APP_SPOTIFY_CLIENT_ID],
    ['response_type', 'token'],
    ['redirect_uri', process.env.REACT_APP_SPOTIFY_REDIRECT_URI],
    ['state', 'reactApp'],
    ['scope', process.env.REACT_APP_SPOTIFY_SCOPES],
    ['show_dialog', 'false'],
  ].map(pair => `${pair[0]}=${pair[1]}`).join('&')}`;
}
