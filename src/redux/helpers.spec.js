import { loadThunk } from './helpers';

describe('Redux helpers', () => {
  describe('Load thunk', () => {
    const mocks = [jest.fn(v => v), jest.fn(), jest.fn()];
    const [dispatch, start, set] = mocks;
    const resetMocks = () => mocks.forEach(mock => mock.mockClear());

    describe('Success', () => {
      const successfulLoad = jest.fn(() => Promise.resolve({ body: 'success' }));

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

      afterAll(resetMocks);
    });
  });
});
