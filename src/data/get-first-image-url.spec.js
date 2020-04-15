import getFirstImageUrl from './get-first-image-url';

describe('Get first image', () => {
  it('returns the url of the first image', () => {
    const url = getFirstImageUrl([{ url: 'this is the one' }]);

    expect(url).toEqual('this is the one');
  });

  it('handles empty arrays', () => {
    const url = getFirstImageUrl([]);

    expect(url).toEqual(undefined);
  });
});
