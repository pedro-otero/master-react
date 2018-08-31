/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { setPlaybackInfo, reduce as playbackInfo } from '../playbackInfo';
import { loadSearchResult, setSearchResult } from '../actions/backend';
import { setArtist, startArtistLoad, loadArtist, failArtistLoad, reduce as artists } from '../artists';
import { loadAlbum, startAlbumLoad, failAlbumLoad, setAlbum, reduce as albums } from '../albums';
import { loadTrack, setTrack, startTrackLoad, failTrackLoad, reduce as tracks } from '../tracks';
import { reduce as auth } from '../user';
import { setProfile, reduce as profile, loadProfile } from '../profile';
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
    user: combineReducers({ auth, playbackInfo, profile }),
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
      setPlaybackInfo,
      loadProfile,
      setProfile,
    },
  })),
);

export default store;
