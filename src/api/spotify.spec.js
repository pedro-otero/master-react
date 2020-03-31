import Spotify from './spotify';

describe('Spotify module', () => {
  it('instantiates the passed SpotifyWebApi module', () => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const webApi = jest.fn(() => ({ setAccessToken: jest.fn() }));
    const getSpotifyModule = Spotify(webApi);
    getSpotifyModule(1, 2);
    expect(webApi.mock.instances.length).toEqual(1);
  });

  it('passes errors if it gets another type of error', (done) => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const webApi = jest.fn(() => ({
      setAccessToken: jest.fn(),
      getArtist: jest.fn().mockRejectedValue({ statusCode: 404 }),
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
      .mockRejectedValueOnce({ statusCode: 429 })
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
