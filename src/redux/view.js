export const viewTrack = trackId =>
  (dispatch, getState, { actions: { loadTrack, loadAlbum, loadArtist } }) =>
    dispatch(loadTrack(trackId)).then((track) => {
      const { artistId, albumId } = track;
      dispatch(loadAlbum(albumId));
      dispatch(loadArtist(artistId));
      return track;
    });
