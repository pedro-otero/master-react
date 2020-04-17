import { artistToState, groupAlbums } from './artists';

describe('Artist helper functions', () => {
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

  describe('Group albums', () => {
    it('own albums', () => {
      const mappedAlbums = groupAlbums([{
        id: 'AL1',
        album_group: 'album',
        album_type: 'album',
        name: 'Own album',
        release_date: '2018-01-05',
        images: [{
          url: 'img1',
        }],
      }]);

      expect(mappedAlbums).toEqual([{
        name: 'Albums',
        items: [{
          id: 'AL1',
          name: 'Own album',
          year: '2018',
          image: 'img1',
        }],
      }]);
    });

    it('own singles', () => {
      const mappedAlbums = groupAlbums([{
        id: 'AL1',
        album_group: 'single',
        album_type: 'single',
        name: 'Own single',
        release_date: '2018-01-05',
        images: [{
          url: 'img1',
        }],
      }]);

      expect(mappedAlbums).toEqual([{
        name: 'Singles',
        items: [{
          id: 'AL1',
          name: 'Own single',
          year: '2018',
          image: 'img1',
        }],
      }]);
    });

    it('own compilations', () => {
      const mappedAlbums = groupAlbums([{
        id: 'AL1',
        album_group: 'compilation',
        album_type: 'compilation',
        name: 'Own compilation',
        release_date: '2018-01-05',
        images: [{
          url: 'img1',
        }],
      }]);

      expect(mappedAlbums).toEqual([{
        name: 'Compilations',
        items: [{
          id: 'AL1',
          name: 'Own compilation',
          year: '2018',
          image: 'img1',
        }],
      }]);
    });

    it('albums appearances', () => {
      const mappedAlbums = groupAlbums([{
        id: 'AL1',
        album_group: 'appears_on',
        album_type: 'album',
        name: 'Collab album',
        release_date: '2018-01-05',
        images: [{
          url: 'img1',
        }],
      }]);

      expect(mappedAlbums).toEqual([{
        name: 'Featured: Albums',
        items: [{
          id: 'AL1',
          name: 'Collab album',
          year: '2018',
          image: 'img1',
        }],
      }]);
    });

    it('singles appearances', () => {
      const mappedAlbums = groupAlbums([{
        id: 'AL1',
        album_group: 'appears_on',
        album_type: 'single',
        name: 'Collab single',
        release_date: '2018-01-05',
        images: [{
          url: 'img1',
        }],
      }]);

      expect(mappedAlbums).toEqual([{
        name: 'Featured: Singles',
        items: [{
          id: 'AL1',
          name: 'Collab single',
          year: '2018',
          image: 'img1',
        }],
      }]);
    });

    it('compilations appearances', () => {
      const mappedAlbums = groupAlbums([{
        id: 'AL1',
        album_group: 'appears_on',
        album_type: 'compilation',
        name: 'Collab compilation',
        release_date: '2018-01-05',
        images: [{
          url: 'img1',
        }],
      }]);

      expect(mappedAlbums).toEqual([{
        name: 'Featured: Compilations',
        items: [{
          id: 'AL1',
          name: 'Collab compilation',
          year: '2018',
          image: 'img1',
        }],
      }]);
    });
  });
});
