import { updateState } from './helpers';

export const loadArtist = id => (dispatch, getState, { spotifyApi, actions }) => {
  const artist = getState().artists[id];
  if (!artist || artist.failed) {
    dispatch(actions.startArtistLoad(id));
    return spotifyApi
      .getArtist(id).then((response) => {
        dispatch(actions.setArtist(response.body));
        return response;
      }, () => dispatch(actions.failArtistLoad(id)));
  }
  return Promise.resolve(artist);
};

export const setArtist = ({ id, name, images }) => ({
  type: 'SET_ARTIST',
  data: {
    id,
    name,
    image: images.length ? images[0].url : undefined,
  },
});

export const startArtistLoad = id => ({
  type: 'START_ARTIST_LOAD',
  data: {
    id,
  },
});

export const failArtistLoad = id => ({
  type: 'FAIL_ARTIST_LOAD',
  data: {
    id,
  },
});

export function reduce(state = {}, { type, data }) {
  const defaultArtist = { loading: false, failed: false };
  const update = updateState(state, defaultArtist);
  switch (type) {
    case 'SET_ARTIST': {
      return update([{ id: data.id, value: { ...data, loading: false, failed: false } }]);
    }
    case 'START_ARTIST_LOAD': {
      return update([{ id: data.id, value: { loading: true, failed: false } }]);
    }
    case 'FAIL_ARTIST_LOAD': {
      return update([{ id: data.id, value: { loading: false, failed: true } }]);
    }
    default: {
      return state;
    }
  }
}
