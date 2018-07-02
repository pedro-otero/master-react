export default (SpotifyWebApi, location) => ({ clientId, redirectUri, throttle }) => {
  const commands = [];
  const api = new SpotifyWebApi({ clientId, redirectUri });
  api.setAccessToken(localStorage.getItem('token'));

  setInterval(() => {
    if (commands.length) {
      const [
        method, args, resolve, reject,
      ] = commands.shift();
      api[method](...args).then(resolve, (e) => {
        error(e);
        reject(e);
      });
    }
  }, throttle);

  const error = (e) => {
    const { statusCode } = e;
    if (statusCode === 401) {
      location.reload();
      return;
    }
    throw e;
  };

  const pushCommand = (method, args) => new Promise((resolve, reject) =>
    commands.push([method, args, resolve, reject]));

  const methods = ['getMyCurrentPlaybackState', 'getAlbum', 'getArtist', 'getTrack'];

  return methods.reduce((publicApi, method) => Object.assign({}, publicApi, {
    [method](...args) {
      return pushCommand(method, args);
    },
  }), {});
};
