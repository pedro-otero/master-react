import Spotify from './spotify';

describe('Spotify module', () => {
  it('instantiates the passed SpotifyWebApi module', () => {
    global.localStorage = { getItem: jest.fn(() => 'fakeToken') };
    const webApi = jest.fn(() => ({ setAccessToken: jest.fn() }));
    const factory = Spotify(webApi);
    new factory(1, 2);
    expect(webApi.mock.instances.length).toEqual(1);
  });
});
