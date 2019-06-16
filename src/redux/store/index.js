/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import request from 'superagent';

import { reduce as playbackInfo, playbackInfoActions } from 'state/playbackInfo';
import { loadSearchResult, setSearchResult } from 'state/actions/backend';
import {
  setArtist,
  startArtistLoad,
  loadArtist,
  failArtistLoad,
  reduce as artists,
  loadArtistAlbums,
} from 'state/artists';
import {
  loadAlbum,
  startAlbumLoad,
  failAlbumLoad,
  setAlbum,
  reduce as albums,
} from 'state/albums';
import {
  loadTrack,
  setTrack,
  startTrackLoad,
  failTrackLoad,
  reduce as tracks,
} from 'state/tracks';
import { reduce as auth } from 'state/user';
import { reduce as profile, userProfileActions } from 'state/profile';
import { addError, clearErrors, reduce } from 'state/errors';
import { savedTracksReducer, setSavedTracks, savedAlbumsReducer, setSavedAlbums } from 'state/library';
import { viewTrack, setAlbumInView, reduce as viewing } from 'state/view';
import { reduce as swipe } from 'state/swipe';
import { reduce as progress } from 'state/progress';

const devTools = global.window.__REDUX_DEVTOOLS_EXTENSION__ &&
  global.window.__REDUX_DEVTOOLS_EXTENSION__();

const albumActions = {
  loadAlbum, startAlbumLoad, failAlbumLoad, setAlbum,
};
const trackActions = {
  loadTrack, setTrack, startTrackLoad, failTrackLoad, viewTrack,
};
const artistActions = {
  setArtist, startArtistLoad, loadArtist, failArtistLoad, loadArtistAlbums,
};

const store = (spotifyApi, preloadedState) => {
  const rootReducer = combineReducers({
    tracks,
    albums,
    artists,
    user: combineReducers({
      auth,
      playbackInfo,
      profile,
      library: combineReducers({
        tracks: savedTracksReducer,
        albums: savedAlbumsReducer,
      }),
    }),
    errors: reduce,
    swipe,
    progress,
    viewing,
  });
  const middleware = applyMiddleware(thunkMiddleware.withExtraArgument({
    spotifyApi,
    actions: {
      ...artistActions,
      ...albumActions,
      ...trackActions,
      loadSearchResult,
      setSearchResult,
      addError,
      clearErrors,
      ...playbackInfoActions,
      ...userProfileActions,
      setSavedTracks,
      setSavedAlbums,
      setAlbumInView,
    },
    config: {
      request,
      backendUrl: `${process.env.REACT_APP_BE_DOMAIN}/data/album`,
    },
  }));
  if (preloadedState) {
    return createStore(rootReducer, preloadedState, compose(middleware, devTools));
  }
  return createStore(rootReducer, devTools, middleware);
};

export default store;
