import { notifier } from 'state/base/actions';
import { buildReducer } from 'state/base/reducers';

export const viewTrack = trackId =>
  (dispatch, getState, {
    actions: {
      loadTrack, loadAlbum, loadArtist, setAlbumInView,
    },
  }) =>
    dispatch(loadTrack(trackId)).then((track) => {
      const { artistId, albumId } = track;
      dispatch(setAlbumInView(albumId));
      dispatch(loadAlbum(albumId));
      dispatch(loadArtist(artistId));
      return track;
    });

export const viewAlbum = albumId =>
  (dispatch, getState, {
    actions: {
      loadAlbum, loadArtist, setAlbumInView,
    },
  }) => {
    dispatch(setAlbumInView(albumId));
    return dispatch(loadAlbum(albumId)).then((album) => {
      dispatch(loadArtist(album.artistId));
      return album;
    });
  };

export const viewArtist = artistId =>
  (dispatch, getState, { actions: { loadArtist } }) =>
    dispatch(loadArtist(artistId));

export const SET_ALBUM_IN_VIEW = 'SET_ALBUM_IN_VIEW';
export const CLEAR_ALBUM_IN_VIEW = 'CLEAR_ALBUM_IN_VIEW';

export const setAlbumInView = notifier(SET_ALBUM_IN_VIEW);
export const clearAlbumInView = notifier(CLEAR_ALBUM_IN_VIEW);

export const reduce = buildReducer([
  [SET_ALBUM_IN_VIEW, (_, { data }) => data.id],
  [CLEAR_ALBUM_IN_VIEW, () => null],
], null);
