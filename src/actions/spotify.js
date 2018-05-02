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
      backend.getCredits(playback.item.album.id).then(({ bestMatch: { tracks } }) => {
        const credits = tracks.find(t => t.id === playback.item.id);
        dispatch({ type: types.LOAD_CREDITS_SUCCESS, credits });
      });
    });
};
