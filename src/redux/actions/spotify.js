export const setPlaybackInfo = data => ({
  type: 'SET_PLAYBACK_INFO',
  data,
});

export const loadPlaybackInfo = () => (dispatch, getState, { spotifyApi, actions }) => {
  dispatch(setPlaybackInfo('LOADING'));
  return spotifyApi.getCurrentPlayback().then((response) => {
    dispatch(setPlaybackInfo(response.body));
    if (response.body) {
      const albumId = response.body.item.album.id;
      dispatch(actions.loadSearchResult(albumId));
      dispatch(actions.setTrack(response.body.item.id, response.body.item));
      const artistId = response.body.item.artists[0].id;
      dispatch(actions.loadArtist(artistId));
      dispatch(actions.loadAlbum(albumId));
    }
    return response;
  }, () => {
    dispatch(setPlaybackInfo('FAILED'));
    dispatch(actions.addError('Loading playback info failed'));
  });
};
