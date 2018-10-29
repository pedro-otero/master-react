import Spotify from './spotify';

describe('Spotify module', () => {
  it('instantiates the passed SpotifyWebApi module', () => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const webApi = jest.fn(() => ({ setAccessToken: jest.fn() }));
    const getSpotifyModule = Spotify(webApi);
    getSpotifyModule(1, 2);
    expect(webApi.mock.instances.length).toEqual(1);
  });

  it('reloads app (to authenticate again) if it gets 401 error', (done) => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const webApi = jest.fn(() => ({
      setAccessToken: jest.fn(),
      getAlbum: jest.fn(() => Promise.reject({ statusCode: 401 })),
    }));
    const location = { reload: jest.fn(() => done()) };
    const getSpotifyModule = Spotify(webApi, location);
    const api = getSpotifyModule(1, 2);
    api.getAlbum();
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
      throw Error('This should not have happened');
    }, (err) => {
      expect(err.statusCode === 404);
      done();
    });
  });

  it('pauses queue if error is 429', (done) => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const clearTimerSpy = jest.spyOn(global.window, 'clearInterval');
    const getArtist = jest.fn()
      .mockImplementationOnce(() => Promise.reject({ statusCode: 429 }))
      .mockImplementationOnce(() => Promise.resolve({}));
    const webApi = jest.fn(() => ({
      setAccessToken: jest.fn(),
      getArtist,
    }));
    const getSpotifyModule = Spotify(webApi, null);
    const api = getSpotifyModule({ throttle: 500 }, 2);
    api.getArtist().then(() => {
      expect(getArtist.mock.calls).toHaveLength(2);
      expect(clearTimerSpy).toBeCalled();
      done();
    }, () => {
      throw Error('This should not have happened');
    });
  });
});
