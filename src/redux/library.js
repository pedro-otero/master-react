import { buildReducer, setIntoMapFromArray } from 'state/base/reducers';
import { combineReducers } from 'redux';
import { loadSavedItems } from './base/helpers';

export function loadSavedTracks() {
  return function (dispatch, getState, { spotifyApi, actions: { setSavedTracks } }) {
    return loadSavedItems(
      getState().user.library.tracks.nextPage,
      dispatch,
      spotifyApi.getMySavedTracks,
      setSavedTracks,
    );
  };
}

export function loadSavedAlbums() {
  return function (dispatch, getState, { spotifyApi, actions: { setSavedAlbums } }) {
    return loadSavedItems(
      getState().user.library.albums.nextPage,
      dispatch,
      spotifyApi.getMySavedAlbums,
      setSavedAlbums,
    );
  };
}

export const SET_SAVED_TRACKS = 'SET_SAVED_TRACKS';
export const SET_SAVED_ALBUMS = 'SET_SAVED_ALBUMS';

const getSavedTrackItem = ({
  track: {
    id, name, artists: [{ name: artist }], album: { name: album },
  },
  added_at: addedAt,
}) => ({
  id, name, artist, album, addedAt,
});

function setSavedItems(type, getItem, response) {
  let nextPage = null;
  if (response.next) {
    nextPage = {
      offset: response.offset,
      limit: response.limit,
    };
  }
  return {
    type,
    data: {
      items: response.items.map(getItem),
      nextPage,
      total: response.total,
    },
  };
}

export function setSavedTracks(response) {
  return setSavedItems(SET_SAVED_TRACKS, getSavedTrackItem, response);
}

const getSavedAlbumItem = ({
  album: {
    id, name, artists: [{ name: artist }],
  },
  added_at: addedAt,
}) => ({
  id, name, artist, addedAt,
});

export function setSavedAlbums(response) {
  return setSavedItems(SET_SAVED_ALBUMS, getSavedAlbumItem, response);
}

function savedItemsReducer(type) {
  return combineReducers({
    items: buildReducer([[type, setIntoMapFromArray('items')]]),
    nextPage: buildReducer([
      [type, (state = { offset: -20, limit: 20 }, action) => action.data.nextPage],
    ]),
    total: buildReducer([[type, (state = 0, action) => action.data.total]]),
  });
}

export const savedTracksReducer = savedItemsReducer(SET_SAVED_TRACKS);
export const savedAlbumsReducer = savedItemsReducer(SET_SAVED_ALBUMS);
