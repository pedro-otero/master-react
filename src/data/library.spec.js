import { compareAlbum, compareTrack, getItems } from './library';

describe('Library helper functions', () => {
  describe('compare tracks to filter', () => {
    it('by name', () => {
      const isMatch = compareTrack('FIND ME');
      const track = {
        name: '### find me ###',
      };

      expect(isMatch(track)).toEqual(true);
    });

    it('by album', () => {
      const isMatch = compareTrack('FIND ME');
      const track = {
        name: '',
        album: '### find me ###',
      };

      expect(isMatch(track)).toEqual(true);
    });

    it('by artist', () => {
      const isMatch = compareTrack('FIND ME');
      const track = {
        name: '',
        album: '',
        artist: '### find me ###',
      };

      expect(isMatch(track)).toEqual(true);
    });
  });

  describe('compare albums to filter', () => {
    it('by name', () => {
      const isMatch = compareAlbum('FIND ME');
      const album = {
        name: '### find me ###',
      };

      expect(isMatch(album)).toEqual(true);
    });

    it('by artist', () => {
      const isMatch = compareAlbum('FIND ME');
      const album = {
        name: '',
        artist: '### find me ###',
      };

      expect(isMatch(album)).toEqual(true);
    });
  });

  describe('get next items', () => {
    it('adds first page', () => {
      const items = getItems({
        items: [],
      }, {
        body: {
          items: [1, 2, 3, 4, 5],
          next: 'there is a next page',
          offset: 0,
          limit: 5,
          total: 50,
        },
      });

      expect(items).toEqual({
        next: {
          offset: 5, limit: 5,
        },
        progress: { display: true, value: 10 },
        items: [1, 2, 3, 4, 5],
      });
    });

    it('adds next page', () => {
      const items = getItems({
        items: [1, 2, 3, 4, 5],
      }, {
        body: {
          items: [6, 7, 8, 9, 0],
          next: 'there is a next page',
          offset: 5,
          limit: 5,
          total: 50,
        },
      });

      expect(items).toEqual({
        next: {
          offset: 10, limit: 5,
        },
        progress: { display: true, value: 20 },
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      });
    });

    it('adds final page', () => {
      const items = getItems({
        items: [1, 2],
      }, {
        body: {
          items: [3],
          // next: 'there is NOT a next page',
          offset: 2,
          limit: 1,
          total: 3,
        },
      });

      expect(items).toEqual({
        next: null,
        progress: { display: false, value: 100 },
        items: [1, 2, 3],
      });
    });
  });
});
