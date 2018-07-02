import { updateState } from './helpers';

export const loadAlbum = id => (dispatch, getState, { spotifyApi, actions }) => {
  const album = getState().albums[id];
  if (!album || album === 'FAILED') {
    dispatch(actions.startAlbumLoad(id));
    return spotifyApi
      .getAlbum(id).then((response) => {
        dispatch(actions.setAlbum(id, response.body));
        const artistId = response.body.artists[0].id;
        dispatch(actions.loadArtist(artistId));
        return response;
      }, () => dispatch(actions.failAlbumLoad(id)));
  }
  return Promise.resolve(album);
};

export const setAlbum = (id, album) => {
  const {
    name, artists, images, tracks: { items: tracks }, release_date: releaseDate,
  } = album;
  const image = images[0].url;
  const artist = artists[0].id;
  const year = releaseDate.substring(0, 4);
  return {
    type: 'SET_ALBUM',
    data: {
      id,
      value: {
        id,
        name,
        artist,
        image,
        tracks: tracks.map(track => Object.assign({ album: { id } }, track)),
        year,
      },
    },
  };
};

export const startAlbumLoad = id => ({
  type: 'START_ALBUM_LOAD',
  data: {
    id,
  },
});

export const failAlbumLoad = id => ({
  type: 'FAIL_ALBUM_LOAD',
  data: {
    id,
  },
});

export function reduce(state = {}, { type, data }) {
  const defaultAlbum = { loading: false, failed: false };
  const update = updateState(state, defaultAlbum);
  switch (type) {
    case 'SET_ALBUM': {
      return update([{
        id: data.id,
        value: {
          ...data.value,
          tracks: data.value.tracks.map(({ id }) => id),
        },
      }]);
    }
    case 'START_ALBUM_LOAD': {
      return update([{ id: data.id, value: { loading: true, failed: false } }]);
    }
    case 'FAIL_ALBUM_LOAD': {
      return update([{ id: data.id, value: { loading: false, failed: true } }]);
    }
    default: {
      return state;
    }
  }
}
