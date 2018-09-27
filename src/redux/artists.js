import { notifier, setter } from 'state/base/actions';
import { buildReducer, fail, set, startLoad } from 'state/base/reducers';
import { loadThunk } from './helpers';

export const START_ARTIST_LOAD = 'START_ARTIST_LOAD';
export const SET_ARTIST = 'SET_ARTIST';
export const FAIL_ARTIST_LOAD = 'FAIL_ARTIST_LOAD';

export const startArtistLoad = notifier(START_ARTIST_LOAD);

export const loadArtist = id => (dispatch, getState, { spotifyApi, actions }) => loadThunk(
  id,
  getState().artists,
  dispatch,
  actions.startArtistLoad,
  spotifyApi.getArtist,
  actions.setArtist,
  actions.failArtistLoad,
);

export const setArtist = setter(SET_ARTIST, artistToState);

export const failArtistLoad = notifier(FAIL_ARTIST_LOAD);

export function artistToState({ id, name, images }) {
  return {
    id,
    name,
    image: images.length ? images[0].url : undefined,
  };
}

export const reduce = buildReducer([
  [START_ARTIST_LOAD, startLoad],
  [SET_ARTIST, set()],
  [FAIL_ARTIST_LOAD, fail],
]);
