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

    beforeAll(() => {
      const thunk = loadSearchResult('AL1');
      thunk(dispatch, () => ({ albums: { } }), { backend, actions });
    });

    it('calls backend', () => {
      expect(backend.getCredits).toHaveBeenCalledWith('AL1');
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

    beforeAll(() => {
      const thunk = loadSearchResult('AL1');
      thunk(dispatch, () => ({ albums: { } }), { backend, actions });
    });

    it('calls backend', () => {
      expect(backend.getCredits).toHaveBeenCalledWith('AL1');
    });

    it('adds error', () => {
      expect(actions.addError).toBeCalled();
    });
  });

  it('Avoids to load searches already in state', () => {
    const backend = {
      getCredits: jest.fn(),
    };
    const thunk = loadSearchResult('AL1');
    thunk(jest.fn(), () => ({ albums: { AL1: { searchStarted: true, progress: 100 } } }), { backend });
    expect(backend.getCredits).not.toBeCalled();
  });

  it('Reloads a failed album', (done) => {
    const backend = {
      getCredits: jest.fn(() => Rx.Observable.create((subscriber) => {
        subscriber.error();
      })),
    };
    const thunk = loadSearchResult('AL1');
    thunk(jest.fn(), () => ({ albums: { AL1: 'FAILED' } }), { backend, actions: { setSearchResult: jest.fn() } }).then(() => {
      expect(backend.getCredits).toBeCalled();
      done();
    });
  });
});
