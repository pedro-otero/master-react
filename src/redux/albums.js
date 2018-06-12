export const loadAlbum = id => (dispatch, getState, { spotifyApi, actions }) => {
  const album = getState().albums[id];
  if (!album || album === 'FAILED') {
    dispatch(actions.setAlbum(id, 'LOADING'));
    return spotifyApi
      .getAlbum(id).then((response) => {
        dispatch(actions.setAlbum(id, response.body));
        response.body.tracks.items
          .forEach(track => dispatch(actions.setTrack(track.id, Object.assign({}, track, {
            album: {
              id: response.body.id,
            },
          }))));
        const artistId = response.body.artists[0].id;
        dispatch(actions.loadArtist(artistId));
        return response;
      }, () => dispatch(actions.setAlbum(id, 'FAILED')));
  }
  return Promise.resolve(album);
};

export const setAlbum = (id, album) => {
  const {
    name, artists, images, tracks: { items: pagedTracks },
  } = album;
  const image = images[0].url;
  const artist = artists[0].id;
  const tracks = pagedTracks.map(track => track.id);
  return {
    type: 'SET_ALBUM',
    data: {
      id,
      value: {
        id,
        name,
        artist,
        image,
        tracks,
      },
    },
  };
};
