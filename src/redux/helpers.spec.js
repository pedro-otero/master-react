import { loadThunk } from './helpers';

describe('Redux helpers', () => {
  describe('Load thunk', () => {
    describe('Success', () => {
      const dispatch = jest.fn(v => v);
      const start = jest.fn();
      const successfulLoad = jest.fn(() => Promise.resolve({ body: 'success' }));
      const set = jest.fn();

      beforeAll(() => {
        loadThunk('itemId', {}, dispatch, start, successfulLoad, set);
      });

      it('calls start action', () => {
        expect(start).toBeCalledWith('itemId');
      });

      it('calls load action', () => {
        expect(successfulLoad).toBeCalledWith('itemId');
      });

      it('calls set action', () => {
        expect(set).toBeCalledWith('success');
      });
    });
  });
});
