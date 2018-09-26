import { FAIL_ARTIST_LOAD, artistToState, reduce, SET_ARTIST, START_ARTIST_LOAD } from './artists';

describe('REDUX: Artists', () => {
  it('maps artists without images to state', () => {
    const mappedArtist = artistToState({
      id: 'AR1',
      name: 'The Artist',
      images: [],
    });
    expect(mappedArtist).toEqual({
      name: 'The Artist',
      id: 'AR1',
    });
  });

  it('maps artist to state', () => {
    const mappedArtist = artistToState({
      id: 'AR1',
      name: 'The Artist',
      images: [{
        url: 'imgUrl',
      }],
    });
    expect(mappedArtist).toEqual({
      id: 'AR1',
      name: 'The Artist',
      image: 'imgUrl',
    });
  });

  describe('reducer', () => {
    it('adds artists', () => {
      const artists = reduce({}, {
        type: SET_ARTIST,
        data: { id: 'AR1' },
      });
      expect(artists.AR1).toEqual(Object.assign({ loading: false, failed: false }, { id: 'AR1' }));
    });

    it('sets artist as loading', () => {
      const artists = reduce({}, {
        type: START_ARTIST_LOAD,
        data: {
          id: 'AR1',
        },
      });
      expect(artists.AR1).toEqual({ loading: true, failed: false });
    });

    it('sets artist as failed', () => {
      const artists = reduce({}, {
        type: FAIL_ARTIST_LOAD,
        data: {
          id: 'AR1',
        },
      });
      expect(artists.AR1).toEqual({ loading: false, failed: true });
    });
  });
});
