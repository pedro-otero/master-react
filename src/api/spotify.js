export default (SpotifyWebApi, location) => ({ clientId, redirectUri, throttle }) => {
  const commands = [];
  const methods = ['getMyCurrentPlaybackState', 'getAlbum', 'getArtist', 'getTrack'];
  const api = new SpotifyWebApi({ clientId, redirectUri });
  api.setAccessToken(localStorage.getItem('token'));

  const processRejection = reject => (e) => {
    const { statusCode } = e;
    if (statusCode === 401) {
      location.reload();
      return;
    }
    reject(e);
  };

  setInterval(() => {
    if (commands.length) {
      const [
        method, args, resolve, reject,
      ] = commands.shift();
      api[method](...args).then(resolve, processRejection(reject));
    }
  }, throttle);

  return methods.reduce((publicApi, method) => Object.assign({}, publicApi, {
    [method]: (...args) => new Promise((resolve, reject) =>
      commands.push([method, args, resolve, reject])),
  }), {});
};
