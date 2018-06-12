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
  type: 'SET_TRACK',
  data: {
    id,
    value: 'LOADING',
  },
});

export const failTrackLoad = id => ({
  type: 'SET_TRACK',
  data: {
    id,
    value: 'FAILED',
  },
});
