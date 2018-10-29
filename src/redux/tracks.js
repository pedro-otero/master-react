import { notifier, setter } from 'state/base/actions';
import { buildReducer, fail, set, setIntoMapFromArray, startLoad } from 'state/base/reducers';
import { SET_ALBUM, SET_SEARCH_RESULT } from 'state/albums';
import { trackToState } from 'state/base/mappers';
import { loadThunk } from './base/helpers';

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

export const reduce = buildReducer([
  [SET_TRACK, set()],
  [SET_ALBUM, setIntoMapFromArray('tracks')],
  [SET_SEARCH_RESULT, setIntoMapFromArray('tracks')],
  [START_TRACK_LOAD, startLoad],
  [FAIL_TRACK_LOAD, fail],
]);
