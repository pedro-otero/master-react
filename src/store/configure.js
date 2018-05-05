import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import SpotifyWebApi from 'spotify-web-api-node';

import rootReducer from '../reducers/index';
import initialState from './initalState';
import SpotifyCustomApi from '../api/spotify';
import Backend from '../api/backend';

const getSpotifyApi = SpotifyCustomApi(SpotifyWebApi, window.location);

export default history => createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware.withExtraArgument({
      spotifyApi: new getSpotifyApi({
        redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
        clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      }),
      backend: new Backend(),
    }),
    routerMiddleware(history),
  ),
);
