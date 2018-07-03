/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import * as playbackInfo from '../playbackInfo';
import { loadSearchResult, setSearchResult } from '../actions/backend';
import { setArtist, startArtistLoad, loadArtist, failArtistLoad, reduce as artists } from '../artists';
import { loadAlbum, startAlbumLoad, failAlbumLoad, setAlbum, reduce as albums } from '../albums';
import { loadTrack, setTrack, startTrackLoad, failTrackLoad, reduce as tracks } from '../tracks';
import { reduce as user } from '../user';
import { addError, clearErrors, reduce } from '../errors';

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
    tracks,
    albums,
    artists,
    playbackInfo: playbackInfo.reduce,
    user,
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
