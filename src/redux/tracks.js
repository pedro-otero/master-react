import { updateState } from './helpers';
import { SET_ALBUM, SET_SEARCH_RESULT } from './albums';
import { SET_ARTIST } from './artists';

export const START_TRACK_LOAD = 'START_TRACK_LOAD';
export const SET_TRACK = 'SET_TRACK';
export const FAIL_TRACK_LOAD = 'FAIL_TRACK_LOAD';

export const loadTrack = id => (dispatch, getState, { spotifyApi, actions }) => {
  const track = getState().tracks[id];
  if (!track || track.failed) {
    dispatch(actions.startTrackLoad(id));
    return spotifyApi
      .getTrack(id).then((response) => {
        dispatch(actions.setTrack(response.body));
        const albumId = response.body.album.id;
        dispatch(actions.loadSearchResult(albumId));
        dispatch(actions.loadAlbum(albumId));
        return response;
      }, () => dispatch(actions.failTrackLoad(id)));
  }
  return Promise.resolve(track);
};

function trackToState(track) {
  const minutes = Math.floor(track.duration_ms / 60000);
  const seconds = Math.floor((track.duration_ms % 60000) / 1000);
  const duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return {
    id: track.id,
    albumId: track.album.id,
    name: track.name,
    artistId: track.artists[0].id,
    artist: track.artists[0].name,
    duration,
  };
}

export const setTrack = track => ({
  type: SET_TRACK,
  data: trackToState(track),
});

export const startTrackLoad = id => ({
  type: START_TRACK_LOAD,
  data: {
    id,
  },
});

export const failTrackLoad = id => ({
  type: FAIL_TRACK_LOAD,
  data: {
    id,
  },
});

export function reduce(state = {}, { type, data }) {
  const defaultTrack = { loading: false, failed: false, searchStarted: false };
  const update = updateState(state, defaultTrack);
  switch (type) {
    case SET_TRACK: {
      return update([{ id: data.id, value: { ...data, loading: false, failed: false } }]);
    }
    case SET_ALBUM: {
      const { image, year, tracks } = data;
      return update(tracks.map(track => ({
        id: track.id,
        value: Object.assign({ image, year }, trackToState(track)),
      })));
    }
    case SET_SEARCH_RESULT: {
      return update(data.tracks);
    }
    case SET_ARTIST: {
      const { image, id: artistId } = data;
      return update(Object.entries(state)
        .filter(([id, track]) => track.artistId === artistId)
        .map(([id]) => ({ id, value: { background: image } })));
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
