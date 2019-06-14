import baseState from './baseState.json';

const store = {
  getState: () => baseState,
  dispatch: () => {},
  subscribe: () => {},
};

const mockStore = state => ({
  ...store,
  getState: () => state,
});

export default mockStore;
