/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import generateReducer from '../reducers/generate-reducer';
import generateCreator from '../actions/generate-creator';
import setPlaybackInfo from '../reducers/spotify';
import { setArtist, startArtistLoad, loadArtist, failArtistLoad } from '../artists';
import { loadSearchResult } from '../actions/backend';
import { loadAlbum, startAlbumLoad, failAlbumLoad, setAlbum } from '../albums';
import { loadTrack, setTrack, startTrackLoad, failTrackLoad } from '../tracks';
import { addError, clearErrors, reduce } from '../errors';

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
    errors: reduce,
  }),
  devTools,
  applyMiddleware(thunkMiddleware.withExtraArgument({
    spotifyApi,
    backend,
    actions: {
      setTrack,
      setAlbum,
      setArtist,
      startArtistLoad,
      loadArtist,
      failArtistLoad,
      loadTrack,
      loadAlbum,
      startAlbumLoad,
      failAlbumLoad,
      loadSearchResult,
      setSearchResult,
      startTrackLoad,
      failTrackLoad,
      addError,
      clearErrors,
    },
  })),
);

export default store;
