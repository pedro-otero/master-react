/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import generateReducer from '../reducers/generate-reducer';
import generateCreator from '../actions/generate-creator';
import setPlaybackInfo from '../reducers/spotify';
import { loadArtist, loadAlbum, loadTrack } from '../actions/spotify';
import { loadSearchResult } from '../actions/backend';
import { addError, clearErrors } from '../errors';

const setAlbum = generateCreator('SET_ALBUM');
const setArtist = generateCreator('SET_ARTIST');
const setTrack = generateCreator('SET_TRACK');
const setSearchResult = generateCreator('SET_SEARCH_RESULT');

const devTools = global.window.__REDUX_DEVTOOLS_EXTENSION__ &&
  global.window.__REDUX_DEVTOOLS_EXTENSION__();

const store = (spotifyApi, backend) => createStore(
  combineReducers({
    searches: generateReducer('SET_SEARCH_RESULT'),
    tracks: generateReducer('SET_TRACK'),
    albums: generateReducer('SET_ALBUM'),
    artists: generateReducer('SET_ARTIST'),
    playbackInfo: setPlaybackInfo,
  }),
  devTools,
  applyMiddleware(thunkMiddleware.withExtraArgument({
    spotifyApi,
    backend,
    actions: {
      setTrack,
      setAlbum,
      setArtist,
      loadArtist,
      loadTrack,
      loadAlbum,
      loadSearchResult,
      setSearchResult,
      addError,
      clearErrors,
    },
  })),
);

export default store;
