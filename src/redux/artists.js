import { notifier, setter } from 'state/base/actions';
import { loadThunk, updateState } from './helpers';

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

export function reduce(state = {}, { type, data }) {
  const defaultArtist = { loading: false, failed: false };
  const update = updateState(state, defaultArtist);
  switch (type) {
    case SET_ARTIST: {
      return update([{ id: data.id, value: { ...data, loading: false, failed: false } }]);
    }
    case START_ARTIST_LOAD: {
      return update([{ id: data.id, value: { loading: true, failed: false } }]);
    }
    case FAIL_ARTIST_LOAD: {
      return update([{ id: data.id, value: { loading: false, failed: true } }]);
    }
    default: {
      return state;
    }
  }
}
