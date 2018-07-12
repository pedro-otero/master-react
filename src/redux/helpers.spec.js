import { loadThunk } from './helpers';

describe('Redux helpers', () => {
  describe('Load thunk', () => {
    const mocks = [jest.fn(v => v), jest.fn(), jest.fn(), jest.fn()];
    const [dispatch, start, set, fail] = mocks;
    const resetMocks = () => mocks.forEach(mock => mock.mockClear());

    describe('Success', () => {
      const successfulLoad = jest.fn(() => Promise.resolve({ body: 'success' }));

      beforeAll(() => {
        loadThunk('itemId', {}, dispatch, start, successfulLoad, set, fail);
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

      it('does not call fail action', () => {
        expect(fail).not.toBeCalled();
      });

      afterAll(resetMocks);
    });

    describe('Failure', () => {
      const failedLoad = jest.fn(() => Promise.reject(Error()));

      beforeAll(() => {
        loadThunk('itemId', {}, dispatch, start, failedLoad, set, fail);
      });

      it('calls start action', () => {
        expect(start).toBeCalledWith('itemId');
      });

      it('calls load action', () => {
        expect(failedLoad).toBeCalledWith('itemId');
      });

      it('does not call set action', () => {
        expect(set).not.toBeCalled();
      });

      it('calls fail action', () => {
        expect(fail).toBeCalledWith('itemId');
      });

      afterAll(resetMocks);
    });
  });
});
