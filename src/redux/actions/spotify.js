export const setPlaybackInfo = data => ({
  type: 'SET_PLAYBACK_INFO',
  data,
});

export const loadPlaybackInfo = () => (dispatch, getState, { spotifyApi, actions }) => {
  dispatch(setPlaybackInfo('LOADING'));
  return spotifyApi.getCurrentPlayback().then((response) => {
    dispatch(setPlaybackInfo(response.body));
    dispatch(actions.setTrack(response.body.item.id, response.body.item));
    dispatch(actions.loadArtist(response.body.item.artists[0].id));
    dispatch(actions.loadAlbum(response.body.item.album.id));
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
