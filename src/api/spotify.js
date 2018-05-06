export default (SpotifyWebApi, location) => ({ clientId, redirectUri }) => {
  const api = new SpotifyWebApi({ clientId, redirectUri });
  api.setAccessToken(localStorage.getItem('token'));

  const success = response => response;

  const error = ({ statusCode }) => {
    if (statusCode === 401) {
      location.reload();
    }
  };

  return {
    getCurrentPlayback: () => api.getMyCurrentPlaybackState().then(success, error),
    getAlbum: id => api.getAlbum(id).then(success, error),
    getArtist: id => api.getArtist(id).then(success, error),
  };
};
