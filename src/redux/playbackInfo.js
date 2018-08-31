export const SET_PLAYBACK_INFO = 'SET_PLAYBACK_INFO';

export const setPlaybackInfo = data => ({
  type: SET_PLAYBACK_INFO,
  data,
});

export const loadPlaybackInfo = () => (dispatch, getState, {
  spotifyApi, actions: { setPlaybackInfo, addError },
}) => {
  dispatch(setPlaybackInfo('LOADING'));
  return spotifyApi.getMyCurrentPlaybackState().then((response) => {
    dispatch(setPlaybackInfo(response.body));
    return response;
  }, () => {
    dispatch(setPlaybackInfo('FAILED'));
    dispatch(addError('Loading playback info failed'));
  });
};

export const reduce = (state = null, action) => {
  switch (action.type) {
    case SET_PLAYBACK_INFO: {
      return action.data;
    }
    default:
      return state;
  }
};
