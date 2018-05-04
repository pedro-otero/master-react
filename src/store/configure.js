import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers/index';
import initialState from './initalState';
import SpotifyApi from '../api/spotify';
import Backend from '../api/backend';


function getSpotifyApi() {
  const api = new SpotifyApi({
    redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
    clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  });
  api.setAccessToken(localStorage.getItem('token'));
  return api;
}

export default history => createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware.withExtraArgument({
      spotifyApi: getSpotifyApi(),
      backend: new Backend(),
    }),
    routerMiddleware(history),
  ),
);
