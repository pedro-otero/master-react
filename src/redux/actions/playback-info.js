export const setPlaybackInfo = data => ({
  type: 'SET_PLAYBACK_INFO',
  data,
});

export const loadPlaybackInfo = () => (dispatch, getState, spotifyApi) => {
  dispatch(setPlaybackInfo('LOADING'));
  return spotifyApi.getCurrentPlayback().then((response) => {
    dispatch(setPlaybackInfo(response.body));
    return response;
  }, () => dispatch(setPlaybackInfo('FAILED')));
};
