export const setPlaybackInfo = data => ({
  type: 'SET_PLAYBACK_INFO',
  data,
});

export const loadPlaybackInfo = () => (dispatch, getState, spotifyApi) => {
  dispatch(setPlaybackInfo('LOADING'));
  return spotifyApi.getCurrentPlayback().then(({ body }) => {
    dispatch(setPlaybackInfo(body));
  }, () => dispatch(setPlaybackInfo('FAILED')));
};
