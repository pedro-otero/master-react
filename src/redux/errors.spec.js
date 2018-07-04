import { ADD_ERROR, addError, CLEAR_ERRORS, clearErrors, reduce } from './errors';

describe('Errors duck', () => {
  it('adds errors', () => {
    const errors = reduce(undefined, {
      type: ADD_ERROR,
      data: 'Some error',
    });
    expect(errors[0]).toEqual('Some error');
  });

  it('clears errors', () => {
    const errors = reduce(['bla', 'bla', 'bla'], { type: CLEAR_ERRORS });
    expect(errors).toEqual([]);
  });

  it('creates ADD_ERROR action', () => {
    const action = addError('This is an error');
    expect(action).toEqual({
      type: ADD_ERROR,
      data: 'This is an error',
    });
  });

  it('creates CLEAR_ERRORS action', () => {
    const action = clearErrors();
    expect(action).toEqual({
      type: CLEAR_ERRORS,
    });
  });
});
