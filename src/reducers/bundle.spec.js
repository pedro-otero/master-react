import reduce from './bundle';

describe('Main reducer', () => {
  describe('returns default state', () => {
    const bundle = reduce(undefined, {
      type: 'ASDFG'
    });

    describe('data from backend', () => {
      test('producers', () => {
        expect(bundle.credits.producers.length === 0)
      });

      test('composers', () => {
        expect(bundle.credits.composers.length === 0)
      });

      test('credits', () => {
        expect(Object.keys(bundle.credits.credits).length === 0)
      });
    });

    test('album', () => {
      expect(bundle.album);
    });

    test('track', () => {
      expect(bundle.track);
    });

    test('artist', () => {
      expect(bundle.artist);
    });
  });
});
