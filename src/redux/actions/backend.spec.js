import * as Rx from 'rxjs';

import { loadSearchResult } from './backend';

describe('Backend actions', () => {
  describe('Successful search result', () => {
    const dispatch = jest.fn();
    const actions = {
      setSearchResult: jest.fn(),
    };
    const backend = {
      getCredits: jest.fn(() => Rx.Observable.create((subscriber) => {
        subscriber.next({});
        subscriber.complete();
      })),
    };

    beforeAll((done) => {
      const thunk = loadSearchResult('AL1');
      thunk(dispatch, () => ({ searches: { } }), { backend, actions }).then(done);
    });

    it('informs data is loading', () => {
      expect(actions.setSearchResult).toHaveBeenCalledWith('AL1', 'LOADING');
    });

    it('calls backend', () => {
      expect(backend.getCredits).toHaveBeenCalledWith('AL1');
    });

    it('informs load finished', () => {
      expect(actions.setSearchResult).toHaveBeenCalledWith('AL1', {});
    });
  });

  describe('Failed search result', () => {
    const dispatch = jest.fn();
    const actions = {
      setSearchResult: jest.fn(),
      addError: jest.fn(),
    };
    const backend = {
      getCredits: jest.fn(() => Rx.Observable.create((subscriber) => {
        subscriber.error();
      })),
    };

    beforeAll((done) => {
      const thunk = loadSearchResult('AL1');
      thunk(dispatch, () => ({ searches: { } }), { backend, actions }).then(done);
    });

    it('informs data is loading', () => {
      expect(actions.setSearchResult).toHaveBeenCalledWith('AL1', 'LOADING');
    });

    it('calls backend', () => {
      expect(backend.getCredits).toHaveBeenCalledWith('AL1');
    });

    it('informs load failed', () => {
      expect(actions.setSearchResult).toHaveBeenCalledWith('AL1', 'FAILED');
    });

    it('adds error', () => {
      expect(actions.addError).toBeCalled();
    });
  });

  it('Avoids to load searches already in state', (done) => {
    const backend = {
      getCredits: jest.fn(),
    };
    const thunk = loadSearchResult('AL1');
    thunk(jest.fn(), () => ({ searches: { AL1: {} } }), { backend }).then(() => {
      expect(backend.getCredits).not.toBeCalled();
      done();
    });
  });

  it('Reloads a failed album', (done) => {
    const backend = {
      getCredits: jest.fn(() => Rx.Observable.create((subscriber) => {
        subscriber.error();
      })),
    };
    const thunk = loadSearchResult('AL1');
    thunk(jest.fn(), () => ({ searches: { AL1: 'FAILED' } }), { backend, actions: { setSearchResult: jest.fn() } }).then(() => {
      expect(backend.getCredits).toBeCalled();
      done();
    });
  });
});
