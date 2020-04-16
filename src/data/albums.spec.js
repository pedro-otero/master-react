import { albumToState } from './albums';

describe('Album to state function', () => {
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
});
