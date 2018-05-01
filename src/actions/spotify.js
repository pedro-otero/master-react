import * as types from "./types";

export const getCurrentPlayback = () => {
  return function (dispatch, getState, { spotifyApi, backend }) {
    return spotifyApi.getCurrentPlayback()
      .then(playback => {
        dispatch({ type: types.LOAD_PLAYBACK_SUCCESS, track: playback.body.item });
        spotifyApi.getAlbum(playback.body.item.album.id).then(album => {
          dispatch({ type: types.LOAD_ALBUM_SUCCESS, album: album.body });
          backend.getCredits(playback.body.item, album.body).then(credits => {
            dispatch({ type: types.LOAD_CREDITS_SUCCESS, credits });
          });
        });
        spotifyApi.getArtist(playback.body.item.artists[0].id).then(artist => {
          dispatch({ type: types.LOAD_ARTIST_SUCCESS, artist: artist.body });
        });
      });
  }
};
