export default (SpotifyWebApi, location) => ({ clientId, redirectUri, throttle }) => {
  const commands = [];
  let timer;
  const methods = ['getMyCurrentPlaybackState', 'getAlbum', 'getArtist', 'getTrack'];
  const api = new SpotifyWebApi({ clientId, redirectUri });
  api.setAccessToken(localStorage.getItem('token'));

  const processRejection = reject => (e) => {
    const { statusCode } = e;
    if (statusCode === 401) {
      location.reload();
      return;
    } else if (statusCode === 429) {
      clearInterval(timer);
      setTimeout(start, 500);
      return;
    }
    reject(e);
  };

  function start() {
    timer = setInterval(() => {
      if (commands.length) {
        const [method, args, resolve, reject] = commands[0];
        api[method](...args).then((response) => {
          commands.shift();
          resolve(response);
        }, processRejection(reject));
      }
    }, throttle);
  }

  start();

  return methods.reduce((publicApi, method) => Object.assign({}, publicApi, {
    [method]: (...args) => new Promise((resolve, reject) =>
      commands.push([method, args, resolve, reject])),
  }), {});
};
