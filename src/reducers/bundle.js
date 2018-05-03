import initialState from '../store/initalState';
import * as types from '../actions/types';

export default (state = initialState.song, action) => {
  switch (action.type) {
    case types.LOAD_PLAYBACK_SUCCESS:
      return Object.assign({}, state, { track: action.track });
    case types.LOAD_CREDITS_SUCCESS:
      return Object.assign({}, state, { credits: action.credits });
    case types.LOAD_ARTIST_SUCCESS:
      return Object.assign({}, state, { artist: action.artist });
    case types.LOAD_ALBUM_SUCCESS:
      return Object.assign({}, state, { album: action.album });
    case types.SET_PROGRESS:
      return Object.assign({}, state, { progress: action.progress });
    default:
      return state;
  }
};
