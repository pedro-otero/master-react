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
