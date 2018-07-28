import { FAIL_ARTIST_LOAD, reduce, SET_ARTIST, setArtist, START_ARTIST_LOAD } from './artists';

describe('REDUX: Artists', () => {
  it('creates SET_ARTIST action for artists without images', () => {
    const action = setArtist({
      id: 'AR1',
      name: 'The Artist',
      images: [],
    });
    expect(action).toEqual({
      type: SET_ARTIST,
      data: {
        name: 'The Artist',
        id: 'AR1',
      },
    });
  });

  it('creates SET_ARTIST action', () => {
    const action = setArtist({
      id: 'AR1',
      name: 'The Artist',
      images: [{
        url: 'imgUrl',
      }],
    });
    expect(action).toEqual({
      type: SET_ARTIST,
      data: {
        id: 'AR1',
        name: 'The Artist',
        image: 'imgUrl',
      },
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
