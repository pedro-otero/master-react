import { notifier, setter } from 'state/base/actions';
import { buildReducer, fail, set, startLoad } from 'state/base/reducers';

export const START_PROFILE_LOAD = 'START_PROFILE_LOAD';
export const FAIL_PROFILE_LOAD = 'FAIL_PROFILE_LOAD';
export const SET_PROFILE = 'SET_PROFILE';

export const loadProfile = () => (dispatch, getState, {
  spotifyApi, actions: { setProfile, startProfileLoad, failProfileLoad },
}) => {
  dispatch(startProfileLoad());
  return spotifyApi.getMe().then(
    response => dispatch(setProfile(response.body)),
    () => dispatch(failProfileLoad()),
  );
};

export const userProfileActions = {
  startProfileLoad: notifier(START_PROFILE_LOAD),
  loadProfile,
  setProfile: setter(SET_PROFILE, ({
    display_name: name, id, images, country,
  }) => ({
    name,
    userId: id,
    avatar: images.length ? images[0].url : null,
    country,
  })),
  failProfileLoad: notifier(FAIL_PROFILE_LOAD),
};

export const reduce = buildReducer([
  [START_PROFILE_LOAD, startLoad],
  [SET_PROFILE, set()],
  [FAIL_PROFILE_LOAD, fail],
]);
