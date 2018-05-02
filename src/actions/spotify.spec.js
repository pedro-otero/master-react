import { getCurrentPlayback } from './spotify';

describe('Spotify async actions', () => {
  describe('getCurrentPlayback', () => {
    const album = { id: 'A1' };
    const artist = { id: 'AR1' };
    const track = {
      id: 'T1',
      album,
      artists: [artist],
    };
    const spotifyApi = {
      getAlbum: jest.fn(() => Promise.resolve({ body: album })),
      getArtist: jest.fn(() => Promise.resolve(artist)),
      getCurrentPlayback: jest.fn(() => Promise.resolve({
        body: {
          item: track,
        },
      })),
    };
    const backend = {
      getCredits: jest.fn(() => Promise.resolve({})),
    };
    getCurrentPlayback()(jest.fn(), null, {
      spotifyApi,
      backend,
    });

    it('calls spotifyApi#getCurrentPlayback once', () => {
      expect(spotifyApi.getCurrentPlayback.mock.calls.length).toEqual(1);
    });

    it('calls spotifyApi#getAlbum', () => {
      expect(spotifyApi.getAlbum.mock.calls).toEqual([['A1']]);
    });

    it('calls spotifyApi#getArtist', () => {
      expect(spotifyApi.getArtist.mock.calls).toEqual([['AR1']]);
    });

    it('calls backend#getCredits', () => {
      expect(backend.getCredits.mock.calls).toEqual([[track, album]]);
    });
  });
});
