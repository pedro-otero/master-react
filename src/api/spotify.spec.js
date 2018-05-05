import Spotify from './spotify';

describe('Spotify module', () => {
  it('instantiates the passed SpotifyWebApi module', () => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const webApi = jest.fn(() => ({ setAccessToken: jest.fn() }));
    const factory = Spotify(webApi);
    new factory(1, 2);
    expect(webApi.mock.instances.length).toEqual(1);
  });

  it('forwards results of the api if requests are succesful', () => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const webApi = jest.fn(() => ({
      setAccessToken: jest.fn(),
      getAlbum: jest.fn(() => Promise.resolve('OK')),
    }));
    const factory = Spotify(webApi);
    const api = new factory(1, 2);
    api.getAlbum().then(value => expect(value).toEqual('OK'), () => expect(undefined));
  });

  it('reloads app (to authenticate again) if it gets 401 error', (done) => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const webApi = jest.fn(() => ({
      setAccessToken: jest.fn(),
      getAlbum: jest.fn(() => Promise.reject({ statusCode: 401 })),
    }));
    const location = { reload: jest.fn() };
    const factory = Spotify(webApi, location);
    const api = new factory(1, 2);
    api.getAlbum().then(() => {
      expect(location.reload).toHaveBeenCalled();
      done();
    });
  });
});
