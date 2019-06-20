import { SET_VALUE, setValue, reduce } from 'state/search';

describe('Search', () => {
  describe('Actions', () => {
    it('sets value', () => {
      const action = setValue('find something');

      expect(action).toEqual({
        type: SET_VALUE,
        data: 'find something',
      });
    });
  });

  describe('Reducer', () => {
    it('sets value', () => {
      const state = reduce({}, {
        type: SET_VALUE,
        data: 'find something',
      });

      expect(state).toEqual({
        value: 'find something',
      });
    });
  });
});
