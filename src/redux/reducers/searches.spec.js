import reduce from './searches';

describe('Searches reducer', () => {
  it('sets search results', () => {
    const searches = reduce({}, {
      type: 'SET_SEARCH_RESULT',
      data: {
        id: 'theId',
        value: 'theValue',
      },
    });
    expect(searches.theId).toEqual('theValue');
  });
});
