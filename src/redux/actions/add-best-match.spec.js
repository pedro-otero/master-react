import addBestMatch from './add-best-match';

describe('Add best match action', () => {
  it('creates action', () => {
    const action = addBestMatch('theId', 'theValue');
    expect(action).toEqual({
      type: 'SET_SEARCH_RESULT',
      data: {
        id: 'theId',
        value: 'theValue',
      },
    });
  });
});
