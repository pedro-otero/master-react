import Spotify from './spotify';

describe('Spotify module', () => {
  it('instantiates the passed SpotifyWebApi module', () => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const webApi = jest.fn(() => ({ setAccessToken: jest.fn() }));
    const getSpotifyModule = Spotify(webApi);
    getSpotifyModule(1, 2);
    expect(webApi.mock.instances.length).toEqual(1);
  });

  it('forwards results of the api if requests are succesful', () => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const webApi = jest.fn(() => ({
      setAccessToken: jest.fn(),
      getMyCurrentPlaybackState: jest.fn(() => Promise.resolve('OK')),
    }));
    const getSpotifyModule = Spotify(webApi);
    const api = getSpotifyModule(1, 2);
    api.getCurrentPlayback().then(value => expect(value).toEqual('OK'), () => expect(undefined));
  });

  it('reloads app (to authenticate again) if it gets 401 error', (done) => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const webApi = jest.fn(() => ({
      setAccessToken: jest.fn(),
      getAlbum: jest.fn(() => Promise.reject({ statusCode: 401 })),
    }));
    const location = { reload: jest.fn() };
    const getSpotifyModule = Spotify(webApi, location);
    const api = getSpotifyModule(1, 2);
    api.getAlbum().then(() => {
      expect(location.reload).toHaveBeenCalled();
      done();
    });
  });

  it('passes errors if it gets another type of error', (done) => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const webApi = jest.fn(() => ({
      setAccessToken: jest.fn(),
      getArtist: jest.fn(() => Promise.reject({ statusCode: 404 })),
    }));
    const getSpotifyModule = Spotify(webApi, null);
    const api = getSpotifyModule(1, 2);
    api.getArtist().then(() => {
      done('with error');
    }, (err) => {
      expect(err.statusCode === 404);
      done();
    });
  });
});
