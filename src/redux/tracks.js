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

export const setTrack = (track) => {
  const minutes = Math.floor(track.duration_ms / 60000);
  const seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
  const duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return {
    type: 'SET_TRACK',
    data: {
      id: track.id,
      albumId: track.album.id,
      name: track.name,
      artistId: track.artists[0].id,
      artist: track.artists[0].name,
      duration,
      composers: [],
      producers: [],
      credits: {},
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
  const update = (tracks) => {
    const defaultTrack = { loading: false, failed: false, searchStarted: false };
    return tracks.reduce((all, track) => {
      const merged = Object.assign(
        { ...(all[track.id] || defaultTrack) },
        track.value,
      );
      return Object.assign({ ...all }, { [track.id]: merged });
    }, state);
  };
  switch (type) {
    case 'SET_TRACK': {
      return update([{ id: data.id, value: { ...data, loading: false, failed: false } }]);
    }
    case 'SET_ALBUM': {
      const { value: { image, year, tracks } } = data;
      return update(tracks.map(id => ({
        id,
        value: { image, year },
      })));
    }
    case 'SET_SEARCH_RESULT': {
      return update(data.tracks);
    }
    case 'SET_ARTIST': {
      const { value: { image, id: artistId } } = data;
      return update(Object.entries(state)
        .filter(([id, track]) => track.artistId === artistId)
        .map(([id]) => ({ id, value: { background: image } })));
    }
    case 'START_TRACK_LOAD': {
      return update([{ id: data.id, value: { loading: true, failed: false } }]);
    }
    case 'FAIL_TRACK_LOAD': {
      return update([{ id: data.id, value: { loading: false, failed: true } }]);
    }
    default: {
      return state;
    }
  }
}
