export default (SpotifyWebApi, location) => ({ clientId, redirectUri }) => {
  const api = new SpotifyWebApi({ clientId, redirectUri });
  api.setAccessToken(localStorage.getItem('token'));

  const error = (e) => {
    const { statusCode } = e;
    if (statusCode === 401) {
      location.reload();
      return;
    }
    throw e;
  };

  return {
    getCurrentPlayback: () => api.getMyCurrentPlaybackState().catch(error),
    getAlbum: id => api.getAlbum(id).catch(error),
    getArtist: id => api.getArtist(id).catch(error),
    getTrack: id => api.getTrack(id).catch(error),
  };
};
