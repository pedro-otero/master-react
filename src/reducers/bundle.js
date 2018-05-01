import initialState from "../store/initalState";
import * as types from "../actions/types";

export default (state = initialState.song, action) =>{
  switch (action.type) {
    case types.LOAD_PLAYBACK_SUCCESS:
      return {
        credits: state.credits, track: action.track, artist: state.artist, album: state.album,
      };
    case types.LOAD_CREDITS_SUCCESS:
      return {
        credits: action.credits, track: state.track, artist: state.artist, album: state.album,
      };
    case types.LOAD_ARTIST_SUCCESS:
      return {
        credits: state.credits, track: state.track, artist: action.artist, album: state.album,
      };
    case types.LOAD_ALBUM_SUCCESS:
      return {
        credits: state.credits, track: state.track, artist: state.artist, album: action.album,
      };
    default:
      return state;
  }
}
