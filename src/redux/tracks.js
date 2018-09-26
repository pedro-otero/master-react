import { notifier, setter } from 'state/base/actions';
import { SET_ALBUM, SET_SEARCH_RESULT } from 'state/albums';
import { trackToState } from 'state/mappers';
import { loadThunk, updateState } from './helpers';

export const START_TRACK_LOAD = 'START_TRACK_LOAD';
export const SET_TRACK = 'SET_TRACK';
export const FAIL_TRACK_LOAD = 'FAIL_TRACK_LOAD';

export const startTrackLoad = notifier(START_TRACK_LOAD);

export const loadTrack = id => (dispatch, getState, { spotifyApi, actions }) => loadThunk(
  id,
  getState().tracks,
  dispatch,
  actions.startTrackLoad,
  spotifyApi.getTrack,
  actions.setTrack,
  actions.failTrackLoad,
);

export const setTrack = setter(SET_TRACK, trackToState);

export const failTrackLoad = notifier(FAIL_TRACK_LOAD);

export function reduce(state = {}, { type, data }) {
  const defaultTrack = { loading: false, failed: false };
  const update = updateState(state, defaultTrack);
  switch (type) {
    case SET_TRACK: {
      return update([{ id: data.id, value: { ...data, loading: false, failed: false } }]);
    }
    case SET_ALBUM: {
      return update(data.tracks.map(track => ({
        id: track.id,
        value: trackToState(track),
      })));
    }
    case SET_SEARCH_RESULT: {
      return update(data.tracks);
    }
    case START_TRACK_LOAD: {
      return update([{ id: data.id, value: { loading: true, failed: false } }]);
    }
    case FAIL_TRACK_LOAD: {
      return update([{ id: data.id, value: { loading: false, failed: true } }]);
    }
    default: {
      return state;
    }
  }
}
