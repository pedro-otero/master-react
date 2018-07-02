export const setPlaybackInfo = data => ({
  type: 'SET_PLAYBACK_INFO',
  data,
});

export const loadPlaybackInfo = () => (dispatch, getState, {
  spotifyApi, actions: {
    setPlaybackInfo,
    loadSearchResult,
    setTrack,
    loadArtist,
    loadAlbum,
    addError,
  },
}) => {
  dispatch(setPlaybackInfo('LOADING'));
  return spotifyApi.getCurrentPlayback().then((response) => {
    dispatch(setPlaybackInfo(response.body));
    if (response.body) {
      const albumId = response.body.item.album.id;
      dispatch(loadSearchResult(albumId));
      const artistId = response.body.item.artists[0].id;
      dispatch(loadAlbum(albumId)).then(() => dispatch(loadArtist(artistId)));
    }
    return response;
  }, () => {
    dispatch(setPlaybackInfo('FAILED'));
    dispatch(addError('Loading playback info failed'));
  });
};

export const reduce = (state = null, action) => {
  switch (action.type) {
    case 'SET_PLAYBACK_INFO': {
      return action.data;
    }
    default:
      return state;
  }
};
