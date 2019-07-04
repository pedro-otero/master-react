import { SET_SEARCH_RESULT } from 'state/albums';
import { setSearchResult, loadSearchResult } from './backend';

describe('Backend actions', () => {
  describe('Successful search result', () => {
    const dispatch = jest.fn();
    const actions = {
      setSearchResult: jest.fn(),
    };
    const request = {
      get: jest.fn(() => ({
        end: fn => fn(null, { body: 'body' }),
      })),
    };

    beforeAll(() => {
      const thunk = loadSearchResult('AL1');
      thunk(dispatch, () => ({ albums: { } }), {
        actions,
        config: {
          request,
          backendUrl: 'my.url',
        },
      });
    });

    it('calls backend', () => {
      expect(request.get).toHaveBeenCalledWith('my.url/AL1');
    });

    it('calls setSearchResult action creator', () => {
      expect(actions.setSearchResult).toHaveBeenCalledWith('body');
    });
  });

  describe('Failed search result', () => {
    const dispatch = jest.fn();
    const actions = {
      setSearchResult: jest.fn(),
      addError: jest.fn(),
    };
    const request = {
      get: jest.fn(() => ({
        end: fn => fn('error'),
      })),
    };

    beforeAll(() => {
      const thunk = loadSearchResult('AL1');
      thunk(dispatch, () => ({ albums: { } }), { actions, config: { request } });
    });

    it('adds error', () => {
      expect(actions.addError).toBeCalled();
    });
  });

  it('Avoids to load searches already in state', () => {
    const request = {
      get: jest.fn(),
    };
    const thunk = loadSearchResult('AL1');
    thunk(jest.fn(), () => ({ albums: { AL1: { progress: 100 } } }), { config: { request } });
    expect(request.get).not.toBeCalled();
  });

  describe('Set search results action', () => {
    it('creates set search results action', () => {
      const action = setSearchResult({
        id: 'L1',
        bestMatch: {
          tracks: [{
            id: 'T1',
            composers: ['One', 'Two'],
            producers: ['Three', 'Four'],
            credits: {},
          }],
        },
      });

      expect(action).toEqual({
        type: SET_SEARCH_RESULT,
        data: {
          id: 'L1',
          progress: undefined,
          tracks: [{
            id: 'T1',
            composers: 'One, Two',
            producers: 'Three, Four',
            credits: {},
          }],
        },
      });
    });
  });
});
