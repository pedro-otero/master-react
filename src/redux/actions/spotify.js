export const setPlaybackInfo = data => ({
  type: 'SET_PLAYBACK_INFO',
  data,
});

export const loadPlaybackInfo = () => (dispatch, getState, { spotifyApi }) => {
  dispatch(setPlaybackInfo('LOADING'));
  return spotifyApi.getCurrentPlayback().then((response) => {
    dispatch(setPlaybackInfo(response.body));
    return response;
  }, () => dispatch(setPlaybackInfo('FAILED')));
};

export const loadAlbum = id => (dispatch, getState, { spotifyApi, actions }) => {
  dispatch(actions.setAlbum(id, 'LOADING'));
  return spotifyApi
    .getAlbum(id).then((response) => {
      dispatch(actions.setAlbum(id, response.body));
      return response;
    }, () => dispatch(actions.setAlbum(id, 'FAILED')));
};

export const loadArtist = id => (dispatch, getState, { spotifyApi, actions }) => {
  dispatch(actions.setArtist(id, 'LOADING'));
  return spotifyApi
    .getArtist(id).then((response) => {
      dispatch(actions.setArtist(id, response.body));
      return response;
    }, () => dispatch(actions.setArtist(id, 'FAILED')));
};
