import { FAIL_ALBUM_LOAD, reduce, SET_ALBUM, albumToState, START_ALBUM_LOAD } from './albums';


describe('REDUX: Albums', () => {
  it('maps album data', () => {
    const mappedAlbum = albumToState({
      id: 'AL1',
      name: 'The Album',
      artists: [{
        id: 'AR1',
      }],
      images: [{
        url: 'imgUrl',
      }],
      tracks: {
        items: [{
          id: 'T1',
          name: 'Track #1',
          duration_ms: 1000,
        }],
      },
      release_date: '2004',
    });
    expect(mappedAlbum).toEqual({
      id: 'AL1',
      name: 'The Album',
      artistId: 'AR1',
      image: 'imgUrl',
      tracks: [{
        id: 'T1',
        name: 'Track #1',
        artistId: 'AR1',
        albumId: 'AL1',
        duration: '0:01',
      }],
      trackIds: ['T1'],
      year: '2004',
    });
  });

  describe('reducer', () => {
    const album = { id: 'AL1', artists: [{ id: 'AR1' }], tracks: { items: [{ id: 'T1' }] } };

    it('adds albums', () => {
      const albums = reduce({}, {
        type: SET_ALBUM,
        data: Object.assign(album, { tracks: [{ id: 'T1' }] }),
      });
      expect(albums.AL1).toEqual(Object.assign({ loading: false, failed: false }, album, { tracks: ['T1'] }));
    });

    it('sets album as loading', () => {
      const albums = reduce({}, {
        type: START_ALBUM_LOAD,
        data: {
          id: album.id,
        },
      });
      expect(albums.AL1).toEqual({ loading: true, failed: false, tracks: [] });
    });

    it('sets album as failed', () => {
      const albums = reduce({}, {
        type: FAIL_ALBUM_LOAD,
        data: {
          id: album.id,
        },
      });
      expect(albums.AL1).toEqual({ loading: false, failed: true, tracks: [] });
    });
  });
});
