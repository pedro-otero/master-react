import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import SpotifyWebApi from 'spotify-web-api-node';

import rootReducer from '../reducers/index';
import initialState from './initalState';
import SpotifyCustomApiFactory from '../api/spotify';
import Backend from '../api/backend';

const CustomSpotifyApi = SpotifyCustomApiFactory(SpotifyWebApi, window.location);

export default history => createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware.withExtraArgument({
      spotifyApi: new CustomSpotifyApi({
        redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
        clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      }),
      backend: new Backend(),
    }),
    routerMiddleware(history),
  ),
);
