import { trackToState } from 'state/base/mappers';
import { notifier, setter } from 'state/base/actions';
import { buildReducer, fail, set, startLoad } from 'state/base/reducers';
import { loadThunk } from './base/helpers';

export const START_ALBUM_LOAD = 'START_ALBUM_LOAD';
export const SET_ALBUM = 'SET_ALBUM';
export const FAIL_ALBUM_LOAD = 'FAIL_ALBUM_LOAD';
export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';

export const startAlbumLoad = notifier(START_ALBUM_LOAD);

export const loadAlbum = id => (dispatch, getState, { spotifyApi, actions }) => loadThunk(
  id,
  getState().albums,
  dispatch,
  actions.startAlbumLoad,
  spotifyApi.getAlbum,
  actions.setAlbum,
  actions.failAlbumLoad,
);

export const setAlbum = setter(SET_ALBUM, albumToState);

export const failAlbumLoad = notifier(FAIL_ALBUM_LOAD);

export function albumToState(album) {
  const {
    id,
    name,
    artists,
    images: [firstImage = {}],
    tracks: { items: tracks },
    release_date: releaseDate,
  } = album;
  const image = firstImage.url;
  const artistId = artists[0].id;
  const year = releaseDate.substring(0, 4);
  return {
    id,
    name,
    artistId,
    image,
    trackIds: tracks.map(track => track.id),
    tracks: tracks.map(track => Object.assign({
      album: { id },
      artists: [{ id: artistId }],
    }, track)).map(trackToState),
    year,
  };
}

export const reduce = buildReducer([
  [SET_ALBUM, set('id', 'name', 'artistId', 'image', 'trackIds', 'year')],
  [SET_SEARCH_RESULT, set('progress')],
  [START_ALBUM_LOAD, startLoad],
  [FAIL_ALBUM_LOAD, fail],
]);
