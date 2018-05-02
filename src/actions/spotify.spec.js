import { getCurrentPlayback } from './spotify';

describe('Spotify async actions', () => {
  describe('getCurrentPlayback', () => {
    const album = { id: 'A1' };
    const artist = { id: 'AR1' };
    const spotifyApi = {
      getAlbum: jest.fn(() => Promise.resolve({ body: { album } })),
      getArtist: jest.fn(() => Promise.resolve(artist)),
      getCurrentPlayback: jest.fn(() => Promise.resolve({
        body: {
          item: {
            id: 'T1',
            album,
            artists: [artist],
          },
        },
      })),
    };
    getCurrentPlayback()(jest.fn(), null, {
      spotifyApi,
      backend: {
        getCredits: jest.fn(() => Promise.resolve({})),
      },
    });

    it('calls getCurrentPlayback once', () => {
      expect(spotifyApi.getCurrentPlayback.mock.calls.length).toEqual(1);
    });

    it('calls getAlbum', () => {
      expect(spotifyApi.getAlbum.mock.calls).toEqual([['A1']]);
    });

    it('calls getArtist', () => {
      expect(spotifyApi.getArtist.mock.calls).toEqual([['AR1']]);
    });
  });
});
