export default (SpotifyWebApi, location, accessToken) => ({ clientId, redirectUri, throttle }) => {
  const commands = [];
  let timer;
  const methods = [
    'getMyCurrentPlaybackState',
    'getAlbum',
    'getArtist',
    'getTrack',
    'getMe',
    'getMySavedTracks',
    'getMySavedAlbums',
    'getArtistAlbums',
  ];
  const api = new SpotifyWebApi({ clientId, redirectUri });
  api.setAccessToken(accessToken);

  function start() {
    timer = setInterval(() => {
      if (commands.length) {
        const [method, args, resolve, reject] = commands.shift();
        api[method](...args).then(resolve, (e) => {
          const { statusCode } = e;
          if (statusCode === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('expiry');
            location.reload();
            return;
          } else if (statusCode === 429) {
            commands.unshift([method, args, resolve, reject]);
            clearInterval(timer);
            // This fixed 500 value HAS TO BE CHANGED for the one in the Retry-After header
            // that is not exposed by the Spotify Web API wrapper.
            // See issue https://github.com/thelinmichael/spotify-web-api-node/issues/217
            setTimeout(start, 500);
            return;
          }
          reject(e);
        });
      }
    }, throttle);
  }

  start();

  return methods.reduce((publicApi, method) => Object.assign({}, publicApi, {
    [method]: (...args) => new Promise((resolve, reject) =>
      commands.push([method, args, resolve, reject])),
  }), {});
};
