export const loadArtist = id => (dispatch, getState, { spotifyApi, actions }) => {
  const artist = getState().artists[id];
  if (!artist || artist === 'FAILED') {
    dispatch(actions.startArtistLoad(id));
    return spotifyApi
      .getArtist(id).then((response) => {
        dispatch(actions.setArtist(id, response.body));
        return response;
      }, () => dispatch(actions.failArtistLoad(id)));
  }
  return Promise.resolve(artist);
};

export const setArtist = (id, { name, images }) => ({
  type: 'SET_ARTIST',
  data: {
    id,
    value: {
      id,
      name,
      image: images.length ? images[0].url : undefined,
    },
  },
});

export const startArtistLoad = id => ({
  type: 'SET_ARTIST',
  data: {
    id,
    value: 'LOADING',
  },
});

export const failArtistLoad = id => ({
  type: 'SET_ARTIST',
  data: {
    id,
    value: 'FAILED',
  },
});

export function reduce(state = {}, { type, data }) {
  const defaultArtist = { loading: false, failed: false };
  switch (type) {
    case 'SET_ARTIST': {
      const artist = { ...(state[data.id] || defaultArtist) };
      Object.assign(artist, { ...data.value, ...defaultArtist });
      return Object.assign({ ...state }, { [data.id]: artist });
    }
    case 'START_ARTIST_LOAD': {
      const artist = { ...(state[data.id] || defaultArtist) };
      Object.assign(artist, { loading: true, failed: false });
      return Object.assign({ ...state }, { [data.id]: artist });
    }
    case 'FAIL_ARTIST_LOAD': {
      const artist = { ...(state[data.id] || defaultArtist) };
      Object.assign(artist, { loading: false, failed: true });
      return Object.assign({ ...state }, { [data.id]: artist });
    }
    default: {
      return state;
    }
  }
}
