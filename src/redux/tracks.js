export const loadTrack = id => (dispatch, getState, { spotifyApi, actions }) => {
  const track = getState().tracks[id];
  if (!track || track === 'FAILED') {
    dispatch(actions.setTrack(id, 'LOADING'));
    return spotifyApi
      .getTrack(id).then((response) => {
        dispatch(actions.setTrack(id, response.body));
        const albumId = response.body.album.id;
        dispatch(actions.loadSearchResult(albumId));
        dispatch(actions.loadAlbum(albumId));
        return response;
      }, () => dispatch(actions.setTrack(id, 'FAILED')));
  }
  return Promise.resolve(track);
};
