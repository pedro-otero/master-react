export const START_PROFILE_LOAD = 'START_PROFILE_LOAD';
export const FAIL_PROFILE_LOAD = 'FAIL_PROFILE_LOAD';
export const SET_PROFILE = 'SET_PROFILE';

export function setProfile({ display_name: name, id, images }) {
  return {
    type: SET_PROFILE,
    data: {
      name, userId: id, avatar: images.length ? images[0].url : null,
    },
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
      return Object.assign({ failed: false, loading: false }, { ...data });
    }
    case FAIL_PROFILE_LOAD: {
      return { failed: true, loading: false };
    }
  }
  return state;
}
