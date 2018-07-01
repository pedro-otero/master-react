export const loadTrack = id => (dispatch, getState, { spotifyApi, actions }) => {
  const track = getState().tracks[id];
  if (!track || track === 'FAILED') {
    dispatch(actions.startTrackLoad(id));
    return spotifyApi
      .getTrack(id).then((response) => {
        dispatch(actions.setTrack(id, response.body));
        const albumId = response.body.album.id;
        dispatch(actions.loadSearchResult(albumId));
        dispatch(actions.loadAlbum(albumId));
        return response;
      }, () => dispatch(actions.failTrackLoad(id)));
  }
  return Promise.resolve(track);
};

export const setTrack = (id, track) => {
  const minutes = Math.floor(track.duration_ms / 60000);
  const seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
  const duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return {
    type: 'SET_TRACK',
    data: {
      id,
      value: {
        id,
        album: track.album.id,
        name: track.name,
        artist: track.artists[0].id,
        duration,
        composers: [],
        producers: [],
        credits: {},
      },
    },
  };
};

export const startTrackLoad = id => ({
  type: 'START_TRACK_LOAD',
  data: {
    id,
  },
});

export const failTrackLoad = id => ({
  type: 'FAIL_TRACK_LOAD',
  data: {
    id,
  },
});

export function reduce(state = {}, { type, data }) {
  const defaultTrack = { loading: false, failed: false };
  switch (type) {
    case 'SET_TRACK': {
      const track = { ...(state[data.id] || defaultTrack) };
      Object.assign(track, { ...data.value, ...defaultTrack });
      return Object.assign({ ...state }, { [data.id]: track });
    }
    case 'START_TRACK_LOAD': {
      const track = { ...(state[data.id] || defaultTrack) };
      Object.assign(track, { loading: true, failed: false });
      return Object.assign({ ...state }, { [data.id]: track });
    }
    case 'FAIL_TRACK_LOAD': {
      const track = { ...(state[data.id] || defaultTrack) };
      Object.assign(track, { loading: false, failed: true });
      return Object.assign({ ...state }, { [data.id]: track });
    }
    default: {
      return state;
    }
  }
}
