import * as types from './types';

export const getCurrentPlayback = () => function (dispatch, getState, { spotifyApi, backend }) {
  return spotifyApi.getCurrentPlayback()
    .then(({ body: playback }) => {
      dispatch({ type: types.LOAD_PLAYBACK_SUCCESS, track: playback.item });
      spotifyApi.getAlbum(playback.item.album.id).then(({ body: album }) => {
        dispatch({ type: types.LOAD_ALBUM_SUCCESS, album });
      });
      spotifyApi.getArtist(playback.item.artists[0].id).then(({ body: artist }) => {
        dispatch({ type: types.LOAD_ARTIST_SUCCESS, artist });
      });
    });
};
export const getCredits = () => function (dispatch, getState, { spotifyApi, backend }) {
  backend.getCredits(getState().song.album.id).then(({ bestMatch: { tracks }, progress }) => {
    const credits = tracks.find(t => t.id === getState().song.track.id);
    dispatch({ type: types.LOAD_CREDITS_SUCCESS, credits });
    dispatch({ type: types.SET_PROGRESS, progress });
  });
};
