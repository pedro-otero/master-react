import { reduce } from './errors';

describe('Errors duck', () => {
  it('adds errors', () => {
    const errors = reduce(undefined, {
      type: 'ADD_ERROR',
      data: 'Some error',
    });
    expect(errors[0]).toEqual('Some error');
  });
});
