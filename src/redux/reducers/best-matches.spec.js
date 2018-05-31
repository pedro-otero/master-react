import reduce from './best-matches';

describe('Best matches reducer', () => {
  it('adds new best matches', () => {
    const bestMatches = reduce({}, {
      type: 'ADD_BEST_MATCH',
      data: {
        id: 'theId',
        value: 'theValue',
      },
    });
    expect(bestMatches.theId).toEqual('theValue');
  });
});
