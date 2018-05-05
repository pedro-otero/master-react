export default SpotifyWebApi => function ({ clientId, redirectUri }) {
  const api = new SpotifyWebApi({ clientId, redirectUri });
  api.setAccessToken(localStorage.getItem('token'));

  const success = response => response;

  const error = ({ statusCode }) => {
    if (statusCode === 401) {
      window.location.reload();
    }
  };

  this.getCurrentPlayback = () => api.getMyCurrentPlaybackState().then(success, error);

  this.getAlbum = id => api.getAlbum(id).then(success, error);

  this.getArtist = id => api.getArtist(id).then(success, error);
};
