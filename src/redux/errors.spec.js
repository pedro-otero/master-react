import { reduce } from './errors';

describe('Errors duck', () => {
  it('adds errors', () => {
    const errors = reduce(undefined, {
      type: 'ADD_ERROR',
      data: 'Some error',
    });
    expect(errors[0]).toEqual('Some error');
  });

  it('clears errors', () => {
    const errors = reduce(['bla', 'bla', 'bla'], { type: 'CLEAR_ERRORS' });
    expect(errors).toEqual([]);
  });
});
