export const viewTrack = trackId =>
  (dispatch, getState, { actions: { loadTrack, loadAlbum, loadArtist } }) =>
    dispatch(loadTrack(trackId)).then((track) => {
      const { artistId, albumId } = track;
      dispatch(loadAlbum(albumId));
      dispatch(loadArtist(artistId));
      return track;
    });

export const viewAlbum = albumId =>
  (dispatch, getState, { actions: { loadTrack, loadAlbum, loadArtist } }) =>
    dispatch(loadAlbum(albumId)).then((album) => {
      dispatch(loadArtist(album.artistId));
      return album;
    });

export const viewArtist = artistId =>
  (dispatch, getState, { actions: { loadArtist } }) =>
    dispatch(loadArtist(artistId));
