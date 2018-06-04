import generateReducer from './generate-reducer';

const reduce = generateReducer('SET_SEARCH_RESULT');

describe('Map reducer generator', () => {
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
