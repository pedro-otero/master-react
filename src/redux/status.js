import { buildReducer } from 'state/base/reducers';
import { FAIL_TRACK_LOAD, START_TRACK_LOAD } from 'state/tracks';
import { FAIL_ALBUM_LOAD, SET_SEARCH_RESULT, START_ALBUM_LOAD } from 'state/albums';
import { SET_SAVED_ALBUMS, SET_SAVED_TRACKS } from 'state/library';

export default buildReducer([
  ['SET_STATUS', (_, { data }) => data],
  [START_TRACK_LOAD, () => 'Loading track...'],
  [FAIL_TRACK_LOAD, () => "Couldn't load track!"],
  [START_ALBUM_LOAD, () => 'Loading album...'],
  [FAIL_ALBUM_LOAD, () => "Couldn't load album!"],
  [SET_SEARCH_RESULT, (_, { data: { tracks, progress } }) => {
    if (progress === 100) {
      return 'Crews';
    }
    return `${progress}%`;
  }],
  [SET_SAVED_TRACKS, () => 'Saved tracks'],
  [SET_SAVED_ALBUMS, () => 'Saved albums'],
], 'Crews');
