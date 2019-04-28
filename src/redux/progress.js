import { buildReducer } from 'state/base/reducers';
import { SET_ALBUM, SET_SEARCH_RESULT, START_ALBUM_LOAD } from 'state/albums';
import { SET_TRACK, START_TRACK_LOAD } from 'state/tracks';
import { SET_ARTIST_ALBUMS, START_ARTIST_LOAD } from 'state/artists';

export const reduce = buildReducer([
  [SET_SEARCH_RESULT, (_, action) => ({
    value: action.data.progress,
    available: action.data.progress !== 100,
  })],
  [START_ALBUM_LOAD, () => ({
    available: false,
    loading: 'Loading info from Spotify...',
  })],
  [SET_ALBUM, () => ({
    available: false,
    loading: 'Starting search...',
  })],
  [START_TRACK_LOAD, () => ({
    available: false,
    loading: 'Loading info from Spotify...',
  })],
  [SET_TRACK, () => ({
    available: false,
    loading: 'Starting search...',
  })],
  [START_ARTIST_LOAD, () => ({
    available: false,
    loading: 'Loading info from Spotify...',
  })],
  [SET_ARTIST_ALBUMS, (_, action) => ({
    value: action.data.progress,
    available: action.data.progress !== 100,
  })],
], {
  available: false,
});
