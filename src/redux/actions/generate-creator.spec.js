import generateCreator from './generate-creator';

const setSearchResult = generateCreator('SET_SEARCH_RESULT');

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
