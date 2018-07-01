/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import generateReducer from '../reducers/generate-reducer';
import generateCreator from '../actions/generate-creator';
import * as playbackInfo from '../playbackInfo';
import { loadSearchResult } from '../actions/backend';
import { setArtist, startArtistLoad, loadArtist, failArtistLoad, reduce as artists } from '../artists';
import { loadAlbum, startAlbumLoad, failAlbumLoad, setAlbum, reduce as albums } from '../albums';
import { loadTrack, setTrack, startTrackLoad, failTrackLoad, reduce as tracks } from '../tracks';
import { addError, clearErrors, reduce } from '../errors';

const setSearchResult = generateCreator('SET_SEARCH_RESULT');

const devTools = global.window.__REDUX_DEVTOOLS_EXTENSION__ &&
  global.window.__REDUX_DEVTOOLS_EXTENSION__();

const albumActions = {
  loadAlbum, startAlbumLoad, failAlbumLoad, setAlbum,
};
const trackActions = {
  loadTrack, setTrack, startTrackLoad, failTrackLoad,
};
const artistActions = {
  setArtist, startArtistLoad, loadArtist, failArtistLoad,
};

const store = (spotifyApi, backend) => createStore(
  combineReducers({
    searches: generateReducer('SET_SEARCH_RESULT'),
    tracks,
    albums,
    artists,
    playbackInfo: playbackInfo.reduce,
    errors: reduce,
  }),
  devTools,
  applyMiddleware(thunkMiddleware.withExtraArgument({
    spotifyApi,
    backend,
    actions: {
      ...artistActions,
      ...albumActions,
      ...trackActions,
      loadSearchResult,
      setSearchResult,
      addError,
      clearErrors,
      setPlaybackInfo: playbackInfo.setPlaybackInfo,
    },
  })),
);

export default store;
