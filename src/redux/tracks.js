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

export const addTrackCredits = (id, { composers, producers, credits }, progress) => ({
  type: 'SET_TRACK',
  data: {
    id,
    value: {
      composers, producers, credits, progress,
    },
  },
});

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
    const defaultTrack = { loading: false, failed: false };
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
      return update([{ id: data.id, value: { ...data.value, loading: false, failed: false } }]);
    }
    case 'SET_ALBUM': {
      const { value: { image, year, tracks } } = data;
      return update(tracks.map(id => ({
        id,
        value: { image, year },
      })));
    }
    case 'SET_ARTIST': {
      const { value: { image, name, id: artistId } } = data;
      return update(Object.entries(state)
        .filter(([id, track]) => track.artist === artistId)
        .map(([id, track]) => ({
          id,
          value: { background: image, artistName: name },
        })));
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
