import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers/index';
import initialState from './initalState';
import SpotifyApi from '../api/spotify';
import Backend from '../api/backend';


function getSpotifyApi(hash) {
  const auth = hash.substr(1).split('&')
    .map(pair => pair.split('='))
    .reduce(
      (all, pair) =>
        Object.defineProperty(all, pair[0], { enumerable: true, value: pair[1] }),
      {},
    );
  const api = new SpotifyApi({
    redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
    clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  });
  api.setAccessToken(auth.access_token);
  return api;
}

export default history => createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware.withExtraArgument({
      spotifyApi: getSpotifyApi(window.location.hash),
      backend: new Backend(),
    }),
    routerMiddleware(history),
  ),
);
