import setSearchResult from './set-search-result';

describe('Set search result action', () => {
  it('creates action', () => {
    const action = setSearchResult('theId', 'theValue');
    expect(action).toEqual({
      type: 'SET_SEARCH_RESULT',
      data: {
        id: 'theId',
        value: 'theValue',
      },
    });
  });
});
