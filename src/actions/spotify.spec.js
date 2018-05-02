import { getCurrentPlayback } from './spotify';

describe('Spotify async actions', () => {
  describe('getCurrentPlayback', () => {
    const album = { id: 'A1' };
    const artist = { id: 'A1' };
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

    describe('calls to getCurrentPlayback', () => {
      it('calls it once', () => {
        expect(spotifyApi.getCurrentPlayback.mock.calls.length).toEqual(1);
      });
    });
  });
});
