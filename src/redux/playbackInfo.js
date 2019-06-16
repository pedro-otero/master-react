import { notifier, setter } from 'state/base/actions';
import { buildReducer, fail, set, startLoad } from 'state/base/reducers';

export const SET_PLAYBACK_INFO = 'SET_PLAYBACK_INFO';
export const START_PLAYBACK_INFO_LOAD = 'START_PLAYBACK_INFO_LOAD';
export const FAIL_PLAYBACK_INFO_LOAD = 'FAIL_PLAYBACK_INFO_LOAD';

export const loadPlaybackInfo = () => (dispatch, getState, {
  spotifyApi, actions: {
    setPlaybackInfo, addError, startPlaybackInfoLoad, failPlaybackInfoLoad,
  },
}) => {
  dispatch(startPlaybackInfoLoad());
  return spotifyApi.getMyCurrentPlaybackState().then((response) => {
    dispatch(setPlaybackInfo(response.body));
    return response;
  }, () => {
    dispatch(failPlaybackInfoLoad());
    dispatch(addError('Loading playback info failed'));
  });
};

export const playbackInfoActions = {
  startPlaybackInfoLoad: notifier(START_PLAYBACK_INFO_LOAD),
  loadPlaybackInfo,
  setPlaybackInfo: setter(SET_PLAYBACK_INFO, (data) => {
    if (data && data.item) {
      const {
        id, name, artists: [{ name: artist }], album: { images: [{ url: image }] },
      } = data.item;
      return {
        itemId: id, name, artist, image,
      };
    }
    return {};
  }),
  failPlaybackInfoLoad: notifier(FAIL_PLAYBACK_INFO_LOAD),
};

export const reduce = buildReducer([
  [START_PLAYBACK_INFO_LOAD, startLoad],
  [SET_PLAYBACK_INFO, set()],
  [FAIL_PLAYBACK_INFO_LOAD, fail],
]);
