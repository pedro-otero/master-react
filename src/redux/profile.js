export const START_PROFILE_LOAD = 'START_PROFILE_LOAD';
export const FAIL_PROFILE_LOAD = 'FAIL_PROFILE_LOAD';
export const SET_PROFILE = 'SET_PROFILE';

export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    data: profile,
  };
}

export const loadProfile = () => (dispatch, getState, {
  spotifyApi, actions: { setProfile },
}) => {
  dispatch({ type: START_PROFILE_LOAD });
  return spotifyApi.getMe().then(
    response => dispatch(setProfile(response.body)),
    () => dispatch({ type: FAIL_PROFILE_LOAD }),
  );
};

export function reduce(state = {}, { type, data }) {
  switch (type) {
    case START_PROFILE_LOAD: {
      return { failed: false, loading: true };
    }
    case SET_PROFILE: {
      return Object.assign({ ...state }, { ...data });
    }
    case FAIL_PROFILE_LOAD: {
      return { failed: true, loading: false };
    }
  }
  return state;
}
