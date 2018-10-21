import { loadThunk, updateState } from './helpers';

describe('Redux helpers', () => {
  describe('Load thunk', () => {
    const mocks = [jest.fn(v => v), jest.fn(), jest.fn(), jest.fn(), jest.fn(() => Promise.resolve({ body: 'success' }))];
    const [dispatch, start, set, fail, successfulLoad] = mocks;
    const resetMocks = () => mocks.forEach(mock => mock.mockClear());

    describe('Success', () => {
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

    it('reloads item that failed previously', () => {
      loadThunk('itemId', { itemId: { failed: true } }, dispatch, start, successfulLoad, set, fail);
      expect(successfulLoad).toHaveBeenCalledWith('itemId');
      successfulLoad.mockClear();
    });

    it('resolves with item that is already loaded', () => {
      loadThunk('itemId', { itemId: { failed: false } }, dispatch, start, successfulLoad, set, fail);
      expect(successfulLoad).not.toBeCalled();
      successfulLoad.mockClear();
    });
  });
});
